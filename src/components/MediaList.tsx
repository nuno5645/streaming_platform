import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Calendar } from 'lucide-react';
import { getImageUrl } from '../services/tmdb';
import type { Movie, TVShow } from '../types/tmdb';

interface Props {
  items: (Movie | TVShow)[];
  type: 'movie' | 'tv';
}

export default function MediaList({ items, type }: Props) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Link key={item.id} to={`/${type}/${item.id}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <img
              src={getImageUrl(item.poster_path)}
              alt={'title' in item ? item.title : item.name}
              className="w-24 h-36 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                {'title' in item ? item.title : item.name}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                {item.overview}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{item.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(
                      'release_date' in item ? item.release_date : item.first_air_date
                    ).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}