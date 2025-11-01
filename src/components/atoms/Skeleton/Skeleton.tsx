import { motion } from 'framer-motion';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  className?: string;
}

const Skeleton = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  className = '',
}: SkeletonProps) => {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
      className={`bg-gray-800/50 animate-pulse ${variantClasses[variant]} ${className}`}
      aria-label="Loading..."
    />
  );
};

export const SkeletonCard = () => (
  <div className="p-6 bg-dark-secondary rounded-xl border border-gray-800">
    <Skeleton variant="rectangular" height={200} className="mb-4" />
    <Skeleton variant="text" height="2rem" className="mb-3" />
    <Skeleton variant="text" height="1.5rem" width="80%" className="mb-2" />
    <Skeleton variant="text" height="1rem" width="60%" />
  </div>
);

export const SkeletonText = ({ lines = 3 }: { lines?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} variant="text" width={i === lines - 1 ? '70%' : '100%'} />
    ))}
  </div>
);

export default Skeleton;
