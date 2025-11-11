import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NewsletterPopup from "./NewsletterPopup";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock hooks
vi.mock("@/hooks", () => ({
  useLocalStorage: vi.fn((key: string, initialValue: any) => [
    initialValue,
    vi.fn(),
  ]),
  useReducedMotion: vi.fn(() => false),
}));

// Mock analytics
vi.mock("@/lib/analytics/googleAnalytics", () => ({
  sendEvent: vi.fn(),
}));

describe("NewsletterPopup", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("shows popup after delay", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()]) // lastDismissed
      .mockReturnValueOnce([false, vi.fn()]); // hasSubscribed

    render(<NewsletterPopup delay={1000} exitIntent={false} />);

    // Should not be visible initially
    expect(
      screen.queryByText(/No te pierdas nuestras novedades/i),
    ).not.toBeInTheDocument();

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(
        screen.getByText(/No te pierdas nuestras novedades/i),
      ).toBeInTheDocument();
    });
  });

  it("does not show if user already subscribed", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([true, vi.fn()]); // hasSubscribed = true

    const { container } = render(<NewsletterPopup />);

    vi.advanceTimersByTime(10000);

    expect(container.firstChild).toBeNull();
  });

  it("does not show if dismissed recently", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const oneDayAgo = Date.now() - 1000 * 60 * 60 * 24; // 1 day ago

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([oneDayAgo, vi.fn()]) // lastDismissed
      .mockReturnValueOnce([false, vi.fn()]);

    const { container } = render(<NewsletterPopup dismissDays={7} />);

    vi.advanceTimersByTime(10000);

    expect(container.firstChild).toBeNull();
  });

  it("renders form with email and name inputs", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);

    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText(/Tu nombre \(opcional\)/i),
      ).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
    });
  });

  it("validates email format", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);

    const user = userEvent.setup({ delay: null });
    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(async () => {
      const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
      await user.type(emailInput, "invalid-email");

      const submitButton = screen.getByRole("button", {
        name: /Quiero suscribirme/i,
      });
      await user.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    });
  });

  it("displays benefits list", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);

    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(() => {
      expect(
        screen.getByText(/Artículos exclusivos sobre desarrollo/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Ofertas y descuentos especiales/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Recursos y herramientas gratis/i),
      ).toBeInTheDocument();
    });
  });

  it("closes popup when close button is clicked", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const mockSetDismissed = vi.fn();

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, mockSetDismissed])
      .mockReturnValueOnce([false, vi.fn()]);

    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(() => {
      const closeButton = screen.getByRole("button", {
        name: /Cerrar modal/i,
      });
      fireEvent.click(closeButton);
    });

    expect(mockSetDismissed).toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const mockSetSubscribed = vi.fn();

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, mockSetSubscribed]);

    const user = userEvent.setup({ delay: null });
    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(async () => {
      const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", {
        name: /Quiero suscribirme/i,
      });
      await user.click(submitButton);
    });

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText(/Suscribiendo.../i)).toBeInTheDocument();
    });
  });

  it("tracks analytics event when popup is shown", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const { sendEvent } = await import("@/lib/analytics/googleAnalytics");

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);

    render(<NewsletterPopup delay={1000} exitIntent={false} />);

    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(sendEvent).toHaveBeenCalledWith("newsletter_popup_shown", {
        trigger: "time_delay",
      });
    });
  });

  it("displays privacy note", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);

    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(() => {
      expect(
        screen.getByText(/No compartimos tu información/i),
      ).toBeInTheDocument();
    });
  });

  it("shows success message after subscription", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([false, vi.fn()]);

    const user = userEvent.setup({ delay: null });
    render(<NewsletterPopup delay={0} exitIntent={false} />);

    await waitFor(async () => {
      const emailInput = screen.getByPlaceholderText(/tu@email.com/i);
      await user.type(emailInput, "test@example.com");

      const submitButton = screen.getByRole("button", {
        name: /Quiero suscribirme/i,
      });
      await user.click(submitButton);
    });

    // Wait for API call simulation (1500ms)
    vi.advanceTimersByTime(1500);

    await waitFor(
      () => {
        expect(screen.getByText(/¡Suscripción Exitosa!/i)).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
  });
});
