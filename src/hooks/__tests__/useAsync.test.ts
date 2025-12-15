import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useAsync } from "../index";

describe("useAsync", () => {
  it("should start in idle state", () => {
    const asyncFn = vi.fn().mockResolvedValue("result");
    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(result.current.status).toBe("idle");
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it("should execute immediately when immediate is true", async () => {
    const asyncFn = vi.fn().mockResolvedValue("result");
    const { result } = renderHook(() => useAsync(asyncFn, true));

    expect(result.current.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toBe("result");
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });

  it("should handle successful async operations", async () => {
    const asyncFn = vi.fn().mockResolvedValue("success-data");
    const { result } = renderHook(() => useAsync(asyncFn, false));

    expect(result.current.status).toBe("idle");

    // Execute manually
    result.current.execute();

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toBe("success-data");
    expect(result.current.error).toBeNull();
  });

  it("should handle failed async operations", async () => {
    const error = new Error("Async error");
    const asyncFn = vi.fn().mockRejectedValue(error);
    const { result } = renderHook(() => useAsync(asyncFn, false));

    result.current.execute();

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.error).toEqual(error);
    expect(result.current.value).toBeNull();
  });

  it("should reset state on new execution", async () => {
    let resolveCount = 0;
    const asyncFn = vi.fn().mockImplementation(async () => {
      resolveCount++;
      return `result-${resolveCount}`;
    });

    const { result } = renderHook(() => useAsync(asyncFn, false));

    // First execution
    result.current.execute();
    await waitFor(() => {
      expect(result.current.value).toBe("result-1");
    });

    // Second execution
    result.current.execute();
    await waitFor(() => {
      expect(result.current.value).toBe("result-2");
    });

    expect(asyncFn).toHaveBeenCalledTimes(2);
  });

  it("should handle async operations with delays", async () => {
    const asyncFn = vi.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve("delayed-result"), 100);
        }),
    );

    const { result } = renderHook(() => useAsync(asyncFn, false));

    result.current.execute();

    expect(result.current.status).toBe("loading");

    await waitFor(
      () => {
        expect(result.current.status).toBe("success");
        expect(result.current.value).toBe("delayed-result");
      },
      { timeout: 200 },
    );
  });

  it("should handle type-safe responses", async () => {
    interface User {
      id: number;
      name: string;
    }

    const mockUser: User = { id: 1, name: "Test User" };
    const asyncFn = vi.fn().mockResolvedValue(mockUser);

    const { result } = renderHook(() => useAsync<User>(asyncFn, true));

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });

    expect(result.current.value).toEqual(mockUser);
  });
});
