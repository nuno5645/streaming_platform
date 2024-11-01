import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search as SearchIcon, X, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchMulti } from '../services/tmdb';
import { getImageUrl } from '../services/tmdb';

interface Props {
  defaultValue?: string;
  autoFocus?: boolean;
  variant?: 'full' | 'compact';
}

export default function SearchBar({ defaultValue = '', autoFocus = false, variant = 'full' }: Props) {
  const navigate = useNavigate();
  const [query, setQuery] = useState(defaultValue);
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading } = useQuery({
    queryKey: ['search', debouncedQuery],
    queryFn: () => searchMulti(debouncedQuery),
    enabled: debouncedQuery.length > 0 && isFocused,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsFocused(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center ${
          variant === 'full' ? 'bg-gray-800' : 'bg-gray-800/50'
        } rounded-lg overflow-hidden transition-colors focus-within:bg-gray-800`}>
          <SearchIcon className="w-5 h-5 ml-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search movies & TV shows..."
            className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
            autoFocus={autoFocus}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-2 hover:bg-gray-700 rounded-full mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      <AnimatePresence>
        {isFocused && query && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden"
          >
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>
            ) : results && results.length > 0 ? (
              <>
                <div className="max-h-[60vh] overflow-y-auto">
                  {results.slice(0, 6).map((item) => (
                    <motion.button
                      key={`${item.media_type}-${item.id}`}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                      onClick={() => {
                        navigate(`/${item.media_type}/${item.id}`);
                        setIsFocused(false);
                      }}
                      className="flex items-center gap-4 w-full p-4 transition-colors"
                    >
                      <img
                        src={getImageUrl(item.poster_path, 'w500')}
                        alt={item.title || item.name}
                        className="w-12 h-18 object-cover rounded"
                      />
                      <div className="flex-1 text-left">
                        <h4 className="font-medium">{item.title || item.name}</h4>
                        <p className="text-sm text-gray-400">
                          {item.media_type === 'movie' ? 'Movie' : 'TV Show'} • {' '}
                          {new Date(
                            item.release_date || item.first_air_date
                          ).getFullYear()}
                        </p>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="p-4 border-t border-gray-700">
                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 text-purple-400 hover:text-purple-300"
                  >
                    <SearchIcon className="w-4 h-4" />
                    <span>View all results</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 text-center text-gray-400">
                No results found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}