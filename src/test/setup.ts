import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock TextEncoder/TextDecoder for Node environment
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder as any;
}

// Mock global.SharedArrayBuffer if not available
if (typeof global.SharedArrayBuffer === "undefined") {
  (global as any).SharedArrayBuffer = ArrayBuffer;
}

// Mock WeakMap globals for webidl-conversions
if (typeof global.WeakMap === "undefined") {
  global.WeakMap = class WeakMap {
    private _map = new Map();
    get(key: any) {
      return this._map.get(key);
    }
    set(key: any, value: any) {
      this._map.set(key, value);
      return this;
    }
    has(key: any) {
      return this._map.has(key);
    }
    delete(key: any) {
      return this._map.delete(key);
    }
  } as any;
}

// Mock performance.getEntriesByType
if (typeof global.performance === "undefined") {
  (global as any).performance = {
    getEntriesByType: () => [],
    now: () => Date.now(),
    mark: () => {},
    measure: () => {},
  };
} else if (!global.performance.getEntriesByType) {
  global.performance.getEntriesByType = () => [];
}

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;
