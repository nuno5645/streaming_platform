import { motion } from 'framer-motion';

interface Props {
  view: 'grid' | 'list';
  count?: number;
}

export default function SkeletonLoader({ view, count = 12 }: Props) {
  if (view === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="space-y-4">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="aspect-[2/3] bg-gray-800 rounded-lg"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              className="h-4 bg-gray-800 rounded"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex gap-4 p-4 bg-gray-800 rounded-lg"
        >
          <div className="w-24 h-36 bg-gray-700 rounded" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-700 rounded w-3/4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}