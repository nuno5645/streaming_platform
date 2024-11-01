import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';

interface Props {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function ViewToggle({ view, onViewChange }: Props) {
  return (
    <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded ${
          view === 'grid'
            ? 'bg-primary-600 text-white'
            : 'hover:bg-gray-700'
        }`}
      >
        <Grid className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onViewChange('list')}
        className={`p-2 rounded ${
          view === 'list'
            ? 'bg-primary-600 text-white'
            : 'hover:bg-gray-700'
        }`}
      >
        <List className="w-5 h-5" />
      </motion.button>
    </div>
  );
}