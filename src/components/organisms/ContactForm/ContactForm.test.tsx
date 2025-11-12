import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ContactForm from "./ContactForm";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    form: ({ children, ...props }: any) => <form {...props}>{children}</form>,
    button: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
  },
}));

// Mock hooks
vi.mock("@/hooks", () => ({
  useInView: vi.fn(() => true),
  useReducedMotion: vi.fn(() => false),
}));

// Mock toast
vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders contact form with all fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servicio de interés/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    expect(submitButton).toBeInTheDocument();
  });

  it("renders privacy policy checkbox", () => {
    render(<ContactForm />);

    expect(
      screen.getByLabelText(/Acepto la política de privacidad/i),
    ).toBeInTheDocument();
  });

  it("displays validation error for empty name", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Nombre debe tener al menos 2 caracteres/i),
      ).toBeInTheDocument();
    });
  });

  it("displays validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);
    await user.type(emailInput, "invalid-email");

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    });
  });

  it("displays validation error for short message", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/Mensaje/i);
    await user.type(messageInput, "Hi");

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Mensaje debe tener al menos 10 caracteres/i),
      ).toBeInTheDocument();
    });
  });

  it("requires privacy policy acceptance", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill all required fields
    await user.type(screen.getByLabelText(/Nombre completo/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(
      screen.getByLabelText(/Mensaje/i),
      "This is a test message with enough characters",
    );

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Debes aceptar la política de privacidad/i),
      ).toBeInTheDocument();
    });
  });

  it("accepts valid form submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill all required fields
    await user.type(screen.getByLabelText(/Nombre completo/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.selectOptions(
      screen.getByLabelText(/Servicio de interés/i),
      "web",
    );
    await user.type(
      screen.getByLabelText(/Mensaje/i),
      "This is a test message with enough characters to pass validation",
    );

    // Accept privacy policy
    const privacyCheckbox = screen.getByLabelText(
      /Acepto la política de privacidad/i,
    );
    await user.click(privacyCheckbox);

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });

    // Submit should work without errors
    await user.click(submitButton);

    // Should show loading state
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /Enviando/i }),
      ).toBeInTheDocument();
    });
  });

  it("displays all service options", () => {
    render(<ContactForm />);

    const serviceSelect = screen.getByLabelText(/Servicio de interés/i);
    const options = Array.from(
      serviceSelect.querySelectorAll("option"),
    ) as HTMLOptionElement[];

    expect(options.map((opt) => opt.value)).toContain("web");
    expect(options.map((opt) => opt.value)).toContain("ia");
    expect(options.map((opt) => opt.value)).toContain("cloud");
    expect(options.map((opt) => opt.value)).toContain("design");
  });

  it("has proper form accessibility", () => {
    render(<ContactForm />);

    // All inputs should have labels
    expect(screen.getByLabelText(/Nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Servicio de interés/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();

    // Form should have proper ARIA attributes
    const form = screen.getByRole("form", { hidden: true });
    expect(form).toBeInTheDocument();
  });

  it("clears form after successful submission", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(
      /Nombre completo/i,
    ) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const messageInput = screen.getByLabelText(
      /Mensaje/i,
    ) as HTMLTextAreaElement;

    // Fill form
    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(
      messageInput,
      "This is a test message with enough characters",
    );
    await user.click(
      screen.getByLabelText(/Acepto la política de privacidad/i),
    );

    // Submit
    await user.click(screen.getByRole("button", { name: /Enviar mensaje/i }));

    // Wait for form to process (simulated delay)
    await waitFor(
      () => {
        // After success, fields should be cleared
        expect(nameInput.value).toBe("");
        expect(emailInput.value).toBe("");
        expect(messageInput.value).toBe("");
      },
      { timeout: 3000 },
    );
  });

  it("disables submit button while submitting", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill valid form
    await user.type(screen.getByLabelText(/Nombre completo/i), "John Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(
      screen.getByLabelText(/Mensaje/i),
      "This is a test message with enough characters",
    );
    await user.click(
      screen.getByLabelText(/Acepto la política de privacidad/i),
    );

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    await user.click(submitButton);

    // Button should be disabled during submission
    await waitFor(() => {
      const button = screen.getByRole("button", { name: /Enviando/i });
      expect(button).toBeDisabled();
    });
  });

  it("validates email format correctly", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/Email/i);

    // Invalid emails
    await user.clear(emailInput);
    await user.type(emailInput, "notanemail");
    await user.tab(); // Trigger onBlur validation

    await waitFor(() => {
      expect(screen.getByText(/Email inválido/i)).toBeInTheDocument();
    });

    // Valid email
    await user.clear(emailInput);
    await user.type(emailInput, "valid@email.com");
    await user.tab();

    await waitFor(() => {
      expect(screen.queryByText(/Email inválido/i)).not.toBeInTheDocument();
    });
  });

  it("prevents spam with very long messages", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/Mensaje/i);
    const veryLongMessage = "a".repeat(2000); // Exceeds typical max length

    await user.type(messageInput, veryLongMessage);

    const submitButton = screen.getByRole("button", {
      name: /Enviar mensaje/i,
    });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Mensaje no puede exceder .* caracteres/i),
      ).toBeInTheDocument();
    });
  });

  it("renders contact information section", () => {
    render(<ContactForm />);

    // Should contain company contact info
    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
  });

  it("has proper input placeholders", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText(/Ej: Juan Pérez/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Cuéntanos sobre tu proyecto/i),
    ).toBeInTheDocument();
  });
});
