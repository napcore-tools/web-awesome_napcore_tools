import { expect, afterEach, vi, beforeEach } from 'vitest';

// Reset mocks and state before each test
beforeEach(() => {
  vi.clearAllMocks();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
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
} as unknown as typeof IntersectionObserver;

// Mock window.history.replaceState to avoid SecurityError in jsdom
if (typeof window !== 'undefined') {
  const originalLocation = window.location;
  const mockHistory = {
    ...window.history,
    replaceState: vi.fn((state, title, url) => {
      // Mock implementation that doesn't throw SecurityError
      try {
        Object.defineProperty(window, 'location', {
          value: new URL(url || '', window.location.href),
          writable: true,
        });
      } catch {
        // Silently ignore errors - in real browser this works
      }
    }),
    pushState: vi.fn((state, title, url) => {
      try {
        Object.defineProperty(window, 'location', {
          value: new URL(url || '', window.location.href),
          writable: true,
        });
      } catch {
        // Silently ignore errors
      }
    }),
  };

  Object.defineProperty(window, 'history', {
    value: mockHistory,
    writable: true,
  });
}
