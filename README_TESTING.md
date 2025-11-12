# Testing Guide - PibeLabs Frontend

This document provides comprehensive guidance on testing practices, setup, and maintenance for the PibeLabs Frontend project.

## Table of Contents

- [Quick Start](#quick-start)
- [Testing Stack](#testing-stack)
- [Running Tests](#running-tests)
- [Test Structure](#test-structure)
- [Writing Tests](#writing-tests)
- [Mocking Strategies](#mocking-strategies)
- [Common Testing Patterns](#common-testing-patterns)
- [Accessibility Testing](#accessibility-testing)
- [Test Coverage](#test-coverage)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

## Quick Start

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests once (CI mode)
npm run test:run

# Generate coverage report
npm run test:coverage
```

## Testing Stack

### Core Testing Tools

- **Vitest** (v4.0.6) - Fast unit test framework with Vite integration
- **@testing-library/react** (v16.3.0) - React component testing utilities
- **@testing-library/user-event** (v14.5.2) - User interaction simulation
- **@testing-library/jest-dom** (v6.6.3) - Custom DOM matchers
- **jsdom** (v25.0.1) - DOM implementation for Node.js

### Why This Stack?

- **Vitest**: Native Vite integration, faster than Jest, ESM support out of the box
- **Testing Library**: Encourages testing from the user's perspective
- **jsdom**: Lightweight DOM simulation without a real browser

## Running Tests

### Development Workflow

```bash
# Watch mode - automatically reruns tests on file changes
npm run test:watch

# Run specific test file
npx vitest src/components/atoms/Button/Button.test.tsx

# Run tests matching a pattern
npx vitest --grep "renders correctly"
```

### CI/CD Mode

```bash
# Run all tests once and exit
npm run test:run

# Generate coverage report
npm run test:coverage

# Run with specific reporter
npx vitest run --reporter=json
```

### Pre-commit Checks

Before committing, always run:

```bash
npm run lint        # ESLint checks
npm run type-check  # TypeScript checks
npm run test:run    # All tests
npm run build       # Production build
```

## Test Structure

### File Organization

Tests are co-located with their components:

```
src/
└── components/
    └── atoms/
        └── Button/
            ├── Button.tsx
            ├── Button.test.tsx  ← Test file
            └── index.ts
```

### Naming Conventions

- Test files: `ComponentName.test.tsx`
- Test suites: `describe("ComponentName", () => { ... })`
- Test cases: `it("does something specific", () => { ... })`

### Test File Template

```typescript
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ComponentName from "./ComponentName";

// Mock external dependencies
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("ComponentName", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<ComponentName />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });

  it("handles user interactions", async () => {
    const user = userEvent.setup();
    render(<ComponentName />);

    const button = screen.getByRole("button");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Updated Text")).toBeInTheDocument();
    });
  });
});
```

## Writing Tests

### The AAA Pattern

Structure tests using **Arrange, Act, Assert**:

```typescript
it("increments counter when button is clicked", async () => {
  // Arrange - Set up test data and render
  const user = userEvent.setup();
  render(<Counter initialValue={0} />);

  // Act - Perform user actions
  const button = screen.getByRole("button", { name: /increment/i });
  await user.click(button);

  // Assert - Verify expected outcome
  expect(screen.getByText("Count: 1")).toBeInTheDocument();
});
```

### Query Priorities

Follow Testing Library's query priority:

1. **Accessible Queries** (Preferred)
   - `getByRole` - Most robust, reflects actual user experience
   - `getByLabelText` - Forms and inputs
   - `getByPlaceholderText` - When label isn't available
   - `getByText` - Non-interactive elements
   - `getByDisplayValue` - Current form values

2. **Semantic Queries** (Use when necessary)
   - `getByAltText` - Images
   - `getByTitle` - Title attributes

3. **Test IDs** (Last resort)
   - `getByTestId` - Only when other queries aren't feasible

### Async Testing

Always use `async/await` with user interactions:

```typescript
it("submits form with valid data", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  render(<ContactForm onSubmit={onSubmit} />);

  // Type into fields
  await user.type(screen.getByLabelText(/name/i), "John Doe");
  await user.type(screen.getByLabelText(/email/i), "john@example.com");

  // Submit form
  await user.click(screen.getByRole("button", { name: /submit/i }));

  // Wait for async operations
  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
  });
});
```

## Mocking Strategies

### Mocking Framer Motion

Framer Motion animations can cause issues in tests. Mock them:

```typescript
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));
```

### Mocking Custom Hooks

```typescript
vi.mock("@/hooks", () => ({
  useLocalStorage: vi.fn(() => [null, vi.fn()]),
  useMediaQuery: vi.fn(() => false),
  useInView: vi.fn(() => true),
  useReducedMotion: vi.fn(() => false),
}));
```

### Mocking External Libraries

```typescript
// React Hot Toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// React Hook Form (if needed)
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    formState: { errors: {} },
  }),
}));
```

### Mocking LocalStorage

```typescript
beforeEach(() => {
  // Create a mock implementation
  const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };

  global.localStorage = localStorageMock as any;
});
```

## Common Testing Patterns

### Testing Form Validation

```typescript
it("displays validation error for invalid email", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email/i);
  await user.type(emailInput, "invalid-email");

  const submitButton = screen.getByRole("button", { name: /submit/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });
});
```

### Testing Conditional Rendering

```typescript
it("does not render when isOpen is false", () => {
  const { container } = render(<Modal isOpen={false} />);
  expect(container.firstChild).toBeNull();
});

it("renders when isOpen is true", () => {
  render(<Modal isOpen={true} />);
  expect(screen.getByRole("dialog")).toBeInTheDocument();
});
```

### Testing User Events

```typescript
it("toggles theme when button is clicked", async () => {
  const user = userEvent.setup();
  render(<ThemeToggle />);

  const toggleButton = screen.getByRole("button", { name: /toggle theme/i });

  // Initial state
  expect(toggleButton).toHaveAttribute("aria-label", "Switch to dark mode");

  // Click to toggle
  await user.click(toggleButton);

  // Updated state
  expect(toggleButton).toHaveAttribute("aria-label", "Switch to light mode");
});
```

### Testing Keyboard Navigation

```typescript
it("navigates with arrow keys", async () => {
  const user = userEvent.setup();
  render(<Carousel images={mockImages} />);

  const container = screen.getByRole("region");
  container.focus();

  // Press right arrow
  await user.keyboard("{ArrowRight}");

  await waitFor(() => {
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });
});
```

### Testing Loading States

```typescript
it("shows loading state during submission", async () => {
  const user = userEvent.setup();
  render(<ContactForm />);

  // Fill and submit form
  await user.type(screen.getByLabelText(/name/i), "John Doe");
  await user.click(screen.getByRole("button", { name: /submit/i }));

  // Should show loading state
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /submitting/i })).toBeDisabled();
  });
});
```

## Accessibility Testing

### ARIA Attributes

```typescript
it("has proper ARIA attributes", () => {
  render(<Modal isOpen={true} />);

  const dialog = screen.getByRole("dialog");
  expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
  expect(dialog).toHaveAttribute("aria-describedby", "modal-description");
});
```

### Form Accessibility

```typescript
it("has proper form accessibility", () => {
  render(<ContactForm />);

  // All inputs should have labels
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

  // Form should be accessible
  const form = screen.getByRole("form", { hidden: true });
  expect(form).toBeInTheDocument();
});
```

### Keyboard Navigation

```typescript
it("is keyboard accessible", async () => {
  const user = userEvent.setup();
  render(<Dropdown />);

  // Tab to dropdown
  await user.tab();
  expect(screen.getByRole("button")).toHaveFocus();

  // Open with Enter
  await user.keyboard("{Enter}");
  expect(screen.getByRole("listbox")).toBeVisible();

  // Navigate with arrows
  await user.keyboard("{ArrowDown}");
  expect(screen.getAllByRole("option")[0]).toHaveFocus();
});
```

## Test Coverage

### Current Coverage

Sprint 7 test coverage as of latest commit:

| Component | Test File | Tests | Status |
|-----------|-----------|-------|--------|
| VideoPlayer | ✅ VideoPlayer.test.tsx | 23 | All Passing |
| CookieConsent | ✅ CookieConsent.test.tsx | 11 | Foundation |
| NewsletterPopup | ✅ NewsletterPopup.test.tsx | 11 | Foundation |
| PortfolioModal | ✅ PortfolioModal.test.tsx | 30 | All Passing |
| ContactForm | ✅ ContactForm.test.tsx | 20 | All Passing |
| Loader | ✅ Loader.test.tsx | 4 | All Passing |

### Generating Coverage Reports

```bash
# Generate HTML coverage report
npm run test:coverage

# View coverage report (opens in browser)
open coverage/index.html
```

### Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

### What to Test

**Always test:**
- User interactions (clicks, typing, navigation)
- Form validation and submission
- Conditional rendering
- Error states
- Loading states
- Accessibility features
- Edge cases and boundary conditions

**Don't test:**
- Third-party library internals
- Browser APIs (trust they work)
- Trivial getters/setters
- Static content

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Every push to `main`
- Every pull request
- Manual workflow dispatch

Example workflow (`.github/workflows/test.yml`):

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run type check
        run: npm run type-check

      - name: Run tests
        run: npm run test:run

      - name: Upload coverage
        uses: codecov/codecov-action@v4
        with:
          files: ./coverage/coverage-final.json
```

## Troubleshooting

### Common Issues

#### Issue: Tests fail with "Cannot find module"

**Solution**: Check path aliases in `vite.config.ts` match `tsconfig.json`:

```typescript
// vite.config.ts
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
    '@/components': path.resolve(__dirname, './src/components'),
  },
},
```

#### Issue: "await can only be used inside async function"

**Solution**: Make test function async:

```typescript
// ❌ Wrong
it("handles click", () => {
  await user.click(button);
});

// ✅ Correct
it("handles click", async () => {
  await user.click(button);
});
```

#### Issue: Tests timeout

**Solution**: Increase timeout or use waitFor properly:

```typescript
await waitFor(
  () => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  },
  { timeout: 3000 } // Increase timeout
);
```

#### Issue: "Element is not visible"

**Solution**: Check if element is hidden by CSS or not rendered:

```typescript
// Use queryBy* for elements that might not exist
expect(screen.queryByText("Hidden")).not.toBeInTheDocument();

// Check for hidden elements
const element = screen.getByText("Text", { hidden: true });
```

#### Issue: Mock not working

**Solution**: Ensure mock is defined before import:

```typescript
// ❌ Wrong order
import Component from "./Component";
vi.mock("@/hooks");

// ✅ Correct order
vi.mock("@/hooks");
import Component from "./Component";
```

### Debugging Tests

```typescript
// Print DOM structure
import { screen } from "@testing-library/react";
screen.debug(); // Prints entire DOM
screen.debug(element); // Prints specific element

// Log queries
screen.logTestingPlaygroundURL(); // Generates Testing Playground URL
```

### Performance

If tests are slow:

1. **Use `userEvent.setup()` once per test**:
   ```typescript
   const user = userEvent.setup();
   ```

2. **Avoid unnecessary renders**:
   ```typescript
   // Only render once
   const { rerender } = render(<Component />);
   ```

3. **Mock expensive operations**:
   ```typescript
   vi.mock("./expensiveModule");
   ```

## Best Practices

1. **Write tests from the user's perspective**: Test behavior, not implementation
2. **Use semantic queries**: Prefer `getByRole` over `getByTestId`
3. **Test accessibility**: Every test should verify accessible behavior
4. **Keep tests isolated**: Each test should be independent
5. **Use descriptive test names**: Clearly state what is being tested
6. **Avoid implementation details**: Don't test state or internal functions
7. **Mock external dependencies**: Keep tests fast and deterministic
8. **Test edge cases**: Empty states, error states, loading states
9. **Use waitFor for async**: Never use arbitrary delays
10. **Clean up after tests**: Use `beforeEach` and `afterEach` hooks

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Testing Library Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Library Cheat Sheet](https://testing-library.com/docs/react-testing-library/cheatsheet/)
- [Accessibility Testing Guide](https://web.dev/accessibility/)

---

**Last Updated**: Sprint 7 - Testing & Quality Assurance
**Maintained By**: PibeLabs Development Team
