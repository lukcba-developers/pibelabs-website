import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CookieConsent from "./CookieConsent";

// Mock framer-motion to avoid animation issues in tests
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
  useLocalStorage: vi.fn((key: string, initialValue: any) => {
    const [value, setValue] = vi.fn().mockReturnValue([initialValue, vi.fn()]);
    return [value, setValue];
  }),
  useReducedMotion: vi.fn(() => false),
}));

// Mock analytics
vi.mock("@/lib/analytics/googleAnalytics", () => ({
  sendEvent: vi.fn(),
}));

describe("CookieConsent", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders cookie consent banner", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue([null, vi.fn()]);

    render(<CookieConsent />);

    await waitFor(() => {
      expect(screen.getByText(/Cookies & Privacidad/i)).toBeInTheDocument();
    });
  });

  it("shows default message", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue([null, vi.fn()]);

    render(<CookieConsent />);

    await waitFor(() => {
      expect(screen.getByText(/Utilizamos cookies/i)).toBeInTheDocument();
    });
  });

  it("shows custom message when provided", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue([null, vi.fn()]);

    const customMessage = "Custom cookie message";
    render(<CookieConsent message={customMessage} />);

    await waitFor(() => {
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  it("renders all three action buttons", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue([null, vi.fn()]);

    render(<CookieConsent />);

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Personalizar/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Rechazar/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /Aceptar todo/i }),
      ).toBeInTheDocument();
    });
  });

  it("calls onAccept when Accept All is clicked", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const mockSetConsent = vi.fn();
    const mockSetPreferences = vi.fn();

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, mockSetConsent])
      .mockReturnValueOnce([
        {
          necessary: true,
          analytics: false,
          marketing: false,
          functional: false,
        },
        mockSetPreferences,
      ]);

    const onAccept = vi.fn();
    render(<CookieConsent onAccept={onAccept} />);

    await waitFor(() => {
      const acceptButton = screen.getByRole("button", {
        name: /Aceptar todo/i,
      });
      fireEvent.click(acceptButton);
    });

    expect(onAccept).toHaveBeenCalled();
  });

  it("calls onReject when Reject is clicked", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const mockSetConsent = vi.fn();
    const mockSetPreferences = vi.fn();

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, mockSetConsent])
      .mockReturnValueOnce([
        {
          necessary: true,
          analytics: false,
          marketing: false,
          functional: false,
        },
        mockSetPreferences,
      ]);

    const onReject = vi.fn();
    render(<CookieConsent onReject={onReject} />);

    await waitFor(() => {
      const rejectButton = screen.getByRole("button", { name: /Rechazar/i });
      fireEvent.click(rejectButton);
    });

    expect(onReject).toHaveBeenCalled();
  });

  it("opens customize modal when Personalizar is clicked", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([
        {
          necessary: true,
          analytics: false,
          marketing: false,
          functional: false,
        },
        vi.fn(),
      ]);

    render(<CookieConsent />);

    await waitFor(() => {
      const customizeButton = screen.getByRole("button", {
        name: /Personalizar/i,
      });
      fireEvent.click(customizeButton);
    });

    await waitFor(() => {
      expect(screen.getByText(/Preferencias de Cookies/i)).toBeInTheDocument();
    });
  });

  it("hides customize button when showCustomize is false", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue([null, vi.fn()]);

    render(<CookieConsent showCustomize={false} />);

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Personalizar/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("does not render when consent is already given", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue(["accepted", vi.fn()]);

    const { container } = render(<CookieConsent />);

    expect(container.firstChild).toBeNull();
  });

  it("renders privacy policy link", async () => {
    const { useLocalStorage } = await import("@/hooks");
    vi.mocked(useLocalStorage).mockReturnValue([null, vi.fn()]);

    render(<CookieConsent />);

    await waitFor(() => {
      const policyLink = screen.getByRole("link", {
        name: /Ver Política de Privacidad/i,
      });
      expect(policyLink).toBeInTheDocument();
      expect(policyLink).toHaveAttribute("href", "/privacy-policy");
    });
  });

  it("tracks analytics event when accepting all cookies", async () => {
    const { useLocalStorage } = await import("@/hooks");
    const { sendEvent } = await import("@/lib/analytics/googleAnalytics");

    vi.mocked(useLocalStorage)
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([
        {
          necessary: true,
          analytics: false,
          marketing: false,
          functional: false,
        },
        vi.fn(),
      ]);

    render(<CookieConsent />);

    await waitFor(() => {
      const acceptButton = screen.getByRole("button", {
        name: /Aceptar todo/i,
      });
      fireEvent.click(acceptButton);
    });

    expect(sendEvent).toHaveBeenCalledWith("cookie_consent", {
      action: "accept_all",
      analytics: true,
      marketing: true,
      functional: true,
    });
  });
});
