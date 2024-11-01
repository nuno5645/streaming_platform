import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface Genre {
  id: number;
  name: string;
}

interface FilterState {
  genres: number[];
  year: { min: number; max: number };
  rating: number;
  language: string;
}

interface Props {
  type: 'movie' | 'tv';
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

async function fetchGenres(type: 'movie' | 'tv'): Promise<Genre[]> {
  const API_KEY = '2480c2206d4661b89bf222cbc9c7f5ea';
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.genres;
}

export default function Filters({ type, filters, onFilterChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: genres } = useQuery({
    queryKey: ['genres', type],
    queryFn: () => fetchGenres(type),
  });

  const currentYear = new Date().getFullYear();
  const yearRange = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const handleGenreToggle = (genreId: number) => {
    const newGenres = filters.genres.includes(genreId)
      ? filters.genres.filter(id => id !== genreId)
      : [...filters.genres, genreId];
    onFilterChange({ ...filters, genres: newGenres });
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
      >
        <Filter className="w-5 h-5" />
        <span>Filters</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl z-40"
          >
            <div className="p-4 space-y-4">
              {/* Genres */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Genres</h3>
                <div className="grid grid-cols-2 gap-2">
                  {genres?.map(genre => (
                    <motion.button
                      key={genre.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleGenreToggle(genre.id)}
                      className={`px-3 py-1.5 rounded text-sm transition-colors ${
                        filters.genres.includes(genre.id)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    >
                      {genre.name}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Year Range */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Year Range</h3>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={filters.year.min}
                    onChange={(e) => onFilterChange({
                      ...filters,
                      year: { ...filters.year, min: Number(e.target.value) }
                    })}
                    className="bg-gray-700 rounded px-2 py-1.5 text-sm"
                  >
                    {yearRange.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <select
                    value={filters.year.max}
                    onChange={(e) => onFilterChange({
                      ...filters,
                      year: { ...filters.year, max: Number(e.target.value) }
                    })}
                    className="bg-gray-700 rounded px-2 py-1.5 text-sm"
                  >
                    {yearRange.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  Minimum Rating: {filters.rating}
                </h3>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={filters.rating}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    rating: Number(e.target.value)
                  })}
                  className="w-full accent-primary-500"
                />
              </div>

              {/* Language */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-2">Language</h3>
                <select
                  value={filters.language}
                  onChange={(e) => onFilterChange({
                    ...filters,
                    language: e.target.value
                  })}
                  className="w-full bg-gray-700 rounded px-2 py-1.5 text-sm"
                >
                  <option value="">All Languages</option>
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="ja">Japanese</option>
                  <option value="ko">Korean</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}