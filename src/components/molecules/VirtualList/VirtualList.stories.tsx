import type { Meta, StoryObj } from "@storybook/react";
import { VirtualList, VirtualGrid } from "./VirtualList";

const meta = {
  title: "Molecules/VirtualList",
  component: VirtualList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof VirtualList>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate mock data
const generateItems = (count: number) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
  }));

export const Default: Story = {
  args: {
    items: generateItems(1000),
    height: 400,
    renderItem: (item) => (
      <div className="p-4 border-b border-gray-700 hover:bg-gray-800">
        <h4 className="font-bold text-cyan-400">{item.title}</h4>
        <p className="text-gray-400 text-sm">{item.description}</p>
      </div>
    ),
  },
};

export const LargeDataset: Story = {
  args: {
    items: generateItems(10000),
    height: 600,
    estimateSize: 80,
    renderItem: (item, index) => (
      <div className="p-4 border-b border-gray-700 hover:bg-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
            {index + 1}
          </div>
          <div>
            <h4 className="font-bold text-white">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
        </div>
      </div>
    ),
  },
};

export const Grid: Story = {
  render: () => {
    const items = generateItems(500);
    return (
      <VirtualGrid
        items={items}
        height={600}
        columns={3}
        estimateSize={150}
        gap={16}
        renderItem={(item) => (
          <div className="bg-dark-secondary rounded-lg p-4 border border-gray-700 hover:border-cyan-500 transition-colors">
            <h4 className="font-bold text-cyan-400 mb-2">{item.title}</h4>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
        )}
      />
    );
  },
};
