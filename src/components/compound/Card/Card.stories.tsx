import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
  title: "Compound/Card",
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <h3 className="text-xl font-bold">Card Title</h3>
      </Card.Header>
      <Card.Body>
        <p>This is the card body content. It can contain any React elements.</p>
      </Card.Body>
      <Card.Footer>
        <button className="text-cyan-400 hover:text-cyan-300">
          Learn More →
        </button>
      </Card.Footer>
    </Card>
  ),
};

export const Glass: Story = {
  render: () => (
    <Card variant="glass">
      <Card.Header>
        <h3 className="text-xl font-bold">Glass Effect</h3>
      </Card.Header>
      <Card.Body>
        <p>Glassmorphism style with backdrop blur and transparency.</p>
      </Card.Body>
    </Card>
  ),
};

export const Gradient: Story = {
  render: () => (
    <Card variant="gradient">
      <Card.Header>
        <h3 className="text-xl font-bold">Gradient Card</h3>
      </Card.Header>
      <Card.Body>
        <p>Card with gradient border effect.</p>
      </Card.Body>
    </Card>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <img
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
          alt="Technology"
          className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
        />
        <h3 className="text-xl font-bold">Featured Project</h3>
      </Card.Header>
      <Card.Body>
        <p>Amazing project with beautiful imagery and great results.</p>
      </Card.Body>
      <Card.Footer>
        <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600">
          View Project
        </button>
      </Card.Footer>
    </Card>
  ),
};

export const OnlyBody: Story = {
  render: () => (
    <Card>
      <Card.Body>
        <p>A simple card with only body content, no header or footer.</p>
      </Card.Body>
    </Card>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Card className="hover:scale-105 transition-transform cursor-pointer">
      <Card.Header>
        <h3 className="text-xl font-bold">Interactive Card</h3>
      </Card.Header>
      <Card.Body>
        <p>Hover over this card to see the scale effect!</p>
      </Card.Body>
    </Card>
  ),
};
