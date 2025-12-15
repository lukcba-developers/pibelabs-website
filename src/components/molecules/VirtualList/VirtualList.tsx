import { useRef, forwardRef, ReactNode } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

/* ============================================
   VirtualList Types
   ============================================ */

export interface VirtualListProps<T> {
  items: T[];
  height: number | string;
  estimateSize?: number;
  overscan?: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  itemClassName?: string;
  onEndReached?: () => void;
  endReachedThreshold?: number;
  keyExtractor?: (item: T, index: number) => string | number;
}

/* ============================================
   VirtualList Component
   ============================================ */

export const VirtualList = forwardRef(
  <T,>(
    {
      items,
      height,
      estimateSize = 50,
      overscan = 5,
      renderItem,
      className = "",
      itemClassName = "",
      onEndReached,
      endReachedThreshold = 0.8,
      keyExtractor = (_item, index) => index,
    }: VirtualListProps<T>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const parentRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
      count: items.length,
      getScrollElement: () => parentRef.current,
      estimateSize: () => estimateSize,
      overscan,
      onChange: (instance) => {
        if (onEndReached) {
          const lastItem = instance.range?.endIndex ?? 0;
          const threshold = items.length * endReachedThreshold;
          if (lastItem >= threshold) {
            onEndReached();
          }
        }
      },
    });

    const virtualItems = virtualizer.getVirtualItems();

    return (
      <div
        ref={parentRef}
        className={`overflow-auto ${className}`}
        style={{ height: typeof height === "number" ? `${height}px` : height }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualItems.map((virtualItem) => {
            const item = items[virtualItem.index];
            const key = keyExtractor(item, virtualItem.index);

            return (
              <div
                key={key}
                className={itemClassName}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {renderItem(item, virtualItem.index)}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
) as <T>(
  props: VirtualListProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => JSX.Element;

VirtualList.displayName = "VirtualList";

/* ============================================
   VirtualGrid Component
   ============================================ */

export interface VirtualGridProps<T> {
  items: T[];
  height: number | string;
  columns: number;
  estimateSize?: number;
  gap?: number;
  overscan?: number;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  keyExtractor?: (item: T, index: number) => string | number;
}

export const VirtualGrid = <T,>({
  items,
  height,
  columns,
  estimateSize = 200,
  gap = 16,
  overscan = 3,
  renderItem,
  className = "",
  keyExtractor = (_item, index) => index,
}: VirtualGridProps<T>) => {
  const parentRef = useRef<HTMLDivElement>(null);

  // Calculate rows
  const rows = Math.ceil(items.length / columns);

  const virtualizer = useVirtualizer({
    count: rows,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize + gap,
    overscan,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      className={`overflow-auto ${className}`}
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {virtualItems.map((virtualRow) => {
          const rowIndex = virtualRow.index;
          const startIndex = rowIndex * columns;
          const rowItems = items.slice(startIndex, startIndex + columns);

          return (
            <div
              key={virtualRow.key}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gap: `${gap}px`,
              }}
            >
              {rowItems.map((item, colIndex) => {
                const itemIndex = startIndex + colIndex;
                const key = keyExtractor(item, itemIndex);

                return <div key={key}>{renderItem(item, itemIndex)}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

VirtualGrid.displayName = "VirtualGrid";
