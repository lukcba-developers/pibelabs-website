import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useLocalStorage } from "../index";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should initialize with default value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default-value"),
    );

    const [value] = result.current;
    expect(value).toBe("default-value");
  });

  it("should initialize with value from localStorage if it exists", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default-value"),
    );

    const [value] = result.current;
    expect(value).toBe("stored-value");
  });

  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    const [, setValue] = result.current;

    act(() => {
      setValue("updated");
    });

    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("updated"));
  });

  it("should support function updates", () => {
    const { result } = renderHook(() => useLocalStorage("counter", 0));

    const [, setValue] = result.current;

    act(() => {
      setValue((prev) => prev + 1);
    });

    expect(JSON.parse(localStorage.getItem("counter") || "0")).toBe(1);
  });

  it("should handle complex objects", () => {
    const complexObject = {
      name: "Test",
      nested: { value: 42 },
      array: [1, 2, 3],
    };

    const { result } = renderHook(() =>
      useLocalStorage("complex", complexObject),
    );

    const [value] = result.current;
    expect(value).toEqual(complexObject);
  });

  it("should remove value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored"));

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    const [, , removeValue] = result.current;

    act(() => {
      removeValue();
    });

    expect(localStorage.getItem("test-key")).toBeNull();
    expect(result.current[0]).toBe("default");
  });

  it("should handle localStorage errors gracefully", () => {
    // Mock localStorage to throw error
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    setItemSpy.mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    const consoleWarnSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    const [, setValue] = result.current;

    act(() => {
      setValue("new-value");
    });

    expect(consoleWarnSpy).toHaveBeenCalled();

    setItemSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  it("should sync across multiple hook instances", () => {
    const { result: result1 } = renderHook(() =>
      useLocalStorage("shared-key", "initial"),
    );

    const { result: result2 } = renderHook(() =>
      useLocalStorage("shared-key", "initial"),
    );

    const [, setValue1] = result1.current;

    act(() => {
      setValue1("updated");
    });

    // Both should have the same value in localStorage
    expect(localStorage.getItem("shared-key")).toBe(JSON.stringify("updated"));
  });
});
