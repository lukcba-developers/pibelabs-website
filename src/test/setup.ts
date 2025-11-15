import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

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

// Ensure WeakMap is properly initialized before any module imports
const originalWeakMap = global.WeakMap;
if (!originalWeakMap || !originalWeakMap.prototype) {
  global.WeakMap = class WeakMap<K extends object = object, V = any> {
    private _map = new Map<K, V>();
    get(key: K): V | undefined {
      return this._map.get(key);
    }
    set(key: K, value: V): this {
      this._map.set(key, value);
      return this;
    }
    has(key: K): boolean {
      return this._map.has(key);
    }
    delete(key: K): boolean {
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
