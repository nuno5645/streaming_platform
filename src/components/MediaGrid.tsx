import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdb';
import type { Movie, TVShow, MediaType } from '../types/tmdb';

interface Props {
  items: (Movie | TVShow)[];
  type: MediaType;
  category?: string;
}

export default function MediaGrid({ items, type, category }: Props) {
  return (
    <div className="space-y-4">
      {category && (
        <h2 className="text-xl font-semibold mb-6">{category}</h2>
      )}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
      >
        {items?.map((item, index) => (
          <Link key={item.id} to={`/${type}/${item.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-[2/3] rounded-lg overflow-hidden group"
            >
              <img
                src={getImageUrl(item.poster_path)}
                alt={'title' in item ? item.title : item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 p-4">
                  <h3 className="text-lg font-semibold">
                    {'title' in item ? item.title : item.name}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {new Date('release_date' in item ? item.release_date : item.first_air_date).getFullYear()}
                  </p>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}