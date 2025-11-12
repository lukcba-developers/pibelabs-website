import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import CookieConsent from "./CookieConsent";
import type { CookiePreferences } from "./CookieConsent";

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

// Mock analytics
vi.mock("@/lib/analytics/googleAnalytics", () => ({
  sendEvent: vi.fn(),
}));

// Mock hooks with default implementation
const mockUseLocalStorage = vi.fn();
const mockUseReducedMotion = vi.fn(() => false);

vi.mock("@/hooks", () => ({
  useLocalStorage: (...args: any[]) => mockUseLocalStorage(...args),
  useReducedMotion: () => mockUseReducedMotion(),
}));

describe("CookieConsent", () => {
  const defaultPreferences: CookiePreferences = {
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    // Default mock implementation
    mockUseLocalStorage.mockReturnValue([null, vi.fn()]);
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("renders cookie consent banner", async () => {
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent />);

    // Fast-forward past the 1000ms delay
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText(/Cookies & Privacidad/i)).toBeInTheDocument();
    });
  });

  it("shows default message", async () => {
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText(/Utilizamos cookies/i)).toBeInTheDocument();
    });
  });

  it("shows custom message when provided", async () => {
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    const customMessage = "Custom cookie message";
    render(<CookieConsent message={customMessage} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });
  });

  it("renders all three action buttons", async () => {
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

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
    const mockSetConsent = vi.fn();
    const mockSetPreferences = vi.fn();

    mockUseLocalStorage
      .mockReturnValueOnce([null, mockSetConsent])
      .mockReturnValueOnce([defaultPreferences, mockSetPreferences]);

    const onAccept = vi.fn();
    render(<CookieConsent onAccept={onAccept} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const acceptButton = screen.getByRole("button", {
        name: /Aceptar todo/i,
      });
      fireEvent.click(acceptButton);
    });

    expect(onAccept).toHaveBeenCalled();
  });

  it("calls onReject when Reject is clicked", async () => {
    const mockSetConsent = vi.fn();
    const mockSetPreferences = vi.fn();

    mockUseLocalStorage
      .mockReturnValueOnce([null, mockSetConsent])
      .mockReturnValueOnce([defaultPreferences, mockSetPreferences]);

    const onReject = vi.fn();
    render(<CookieConsent onReject={onReject} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const rejectButton = screen.getByRole("button", { name: /Rechazar/i });
      fireEvent.click(rejectButton);
    });

    expect(onReject).toHaveBeenCalled();
  });

  it("opens customize modal when Personalizar is clicked", async () => {
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

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
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent showCustomize={false} />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", { name: /Personalizar/i }),
      ).not.toBeInTheDocument();
    });
  });

  it("does not render when consent is already given", () => {
    mockUseLocalStorage
      .mockReturnValueOnce(["accepted", vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    const { container } = render(<CookieConsent />);

    expect(container.firstChild).toBeNull();
  });

  it("renders privacy policy link", async () => {
    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      const policyLink = screen.getByRole("link", {
        name: /Ver Política de Privacidad/i,
      });
      expect(policyLink).toBeInTheDocument();
      expect(policyLink).toHaveAttribute("href", "/privacy-policy");
    });
  });

  it("tracks analytics event when accepting all cookies", async () => {
    const { sendEvent } = await import("@/lib/analytics/googleAnalytics");

    mockUseLocalStorage
      .mockReturnValueOnce([null, vi.fn()])
      .mockReturnValueOnce([defaultPreferences, vi.fn()]);

    render(<CookieConsent />);
    act(() => {
      vi.advanceTimersByTime(1000);
    });

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
