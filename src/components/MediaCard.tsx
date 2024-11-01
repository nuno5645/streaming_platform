import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdb';
import type { Movie, TVShow, MediaType } from '../types/tmdb';

interface Props {
  media: Movie | TVShow;
  type: MediaType;
}

export default function MediaCard({ media, type }: Props) {
  const title = 'title' in media ? media.title : media.name;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group rounded-lg overflow-hidden shadow-lg"
    >
      <Link to={`/${type}/${media.id}`}>
        <div className="aspect-[2/3] relative">
          <img
            src={getImageUrl(media.poster_path)}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              className="rounded-full bg-white p-4"
            >
              <Play className="w-8 h-8 text-black" />
            </motion.div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">★</span>
            <span className="ml-1">{media.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}