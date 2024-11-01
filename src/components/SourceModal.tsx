import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Play } from 'lucide-react';
import type { VideoSource } from '../types/source';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sources: VideoSource[];
  selectedSource: VideoSource | null;
  onSelectSource: (source: VideoSource) => void;
}

export default function SourceModal({
  isOpen,
  onClose,
  sources,
  selectedSource,
  onSelectSource,
}: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gray-800 rounded-xl w-full max-w-lg p-6 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Select Source</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid gap-2 max-h-[60vh] overflow-y-auto pr-2">
              {sources.map((source) => (
                <motion.button
                  key={source.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectSource(source)}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    selectedSource?.name === source.name
                      ? 'bg-purple-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Play className="w-5 h-5" />
                    <span className="font-medium">{source.name}</span>
                  </div>
                  {selectedSource?.name === source.name && (
                    <Check className="w-5 h-5" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}