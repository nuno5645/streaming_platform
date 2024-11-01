import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/tmdb';
import type { Movie, TVShow } from '../types/tmdb';

interface Props {
  media: Movie | TVShow;
  type: 'movie' | 'tv';
}

export default function HeroSection({ media, type }: Props) {
  const title = 'title' in media ? media.title : media.name;

  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(media.backdrop_path, 'original')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-gray-300 text-lg mb-8">{media.overview}</p>
          
          <div className="flex space-x-4">
            <Link to={`/${type}/${media.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
              >
                <Play className="w-5 h-5" />
                <span>Watch Now</span>
              </motion.button>
            </Link>
            <Link to={`/${type}/${media.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}