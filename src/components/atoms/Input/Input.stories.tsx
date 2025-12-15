import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Full Name",
    placeholder: "John Doe",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "email@example.com",
    error: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    placeholder: "Cannot edit",
    disabled: true,
  },
};

export const Email: Story = {
  args: {
    label: "Email Address",
    type: "email",
    placeholder: "your@email.com",
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const Textarea: Story = {
  args: {
    label: "Message",
    type: "textarea",
    placeholder: "Enter your message here...",
    rows: 4,
  },
};
