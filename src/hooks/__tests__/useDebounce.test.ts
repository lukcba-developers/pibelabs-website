import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useDebounce } from "../index";

describe("useDebounce", () => {
  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    expect(result.current).toBe("initial");

    // Update value
    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial"); // Still old value immediately

    // Wait for debounce
    await waitFor(
      () => {
        expect(result.current).toBe("updated");
      },
      { timeout: 600 },
    );
  });

  it("should reset debounce timer on rapid changes", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } },
    );

    // Rapid changes
    rerender({ value: "change1" });
    await new Promise((resolve) => setTimeout(resolve, 200));
    rerender({ value: "change2" });
    await new Promise((resolve) => setTimeout(resolve, 200));
    rerender({ value: "final" });

    // Should still be initial during rapid changes
    expect(result.current).toBe("initial");

    // Wait for final debounce
    await waitFor(
      () => {
        expect(result.current).toBe("final");
      },
      { timeout: 600 },
    );
  });

  it("should handle different delay values", async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 200 },
      },
    );

    rerender({ value: "updated", delay: 200 });

    await waitFor(
      () => {
        expect(result.current).toBe("updated");
      },
      { timeout: 300 },
    );
  });

  it("should cancel debounce on unmount", () => {
    const { result, unmount } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "test" } },
    );

    unmount();
    // Should not throw error
    expect(result.current).toBe("test");
  });
});
