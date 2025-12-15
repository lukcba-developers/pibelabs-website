import type { Meta, StoryObj } from "@storybook/react";
import { OptimizedImage } from "./OptimizedImage";

const meta = {
  title: "Atoms/OptimizedImage",
  component: OptimizedImage,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof OptimizedImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    alt: "Technology workspace",
    width: 800,
    height: 600,
  },
};

export const WithPriority: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
    alt: "Hero image",
    width: 1200,
    height: 800,
    priority: true,
  },
};

export const CustomQuality: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
    alt: "High quality image",
    width: 600,
    height: 400,
    quality: 95,
  },
};

export const WithObjectFit: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=400",
    alt: "Square image",
    width: 400,
    height: 400,
    objectFit: "cover",
  },
};

export const Rounded: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=300",
    alt: "Profile picture",
    width: 300,
    height: 300,
    className: "rounded-full",
  },
};

export const LazyLoading: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800",
    alt: "Lazy loaded image",
    width: 800,
    height: 600,
  },
  decorators: [
    (Story) => (
      <div style={{ marginTop: "150vh" }}>
        <p style={{ marginBottom: "20px" }}>
          Scroll down to see lazy loading in action!
        </p>
        <Story />
      </div>
    ),
  ],
};
