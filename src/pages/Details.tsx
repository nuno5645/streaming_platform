import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getDetails, getImageUrl } from '../services/tmdb';
import VideoPlayer from '../components/VideoPlayer';
import { Calendar, Star } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Details() {
  const { id, type } = useParams<{ id: string; type: 'movie' | 'tv' }>();

  const { data: media } = useQuery({
    queryKey: ['details', type, id],
    queryFn: () => getDetails(type!, id!),
    enabled: !!type && !!id,
  });

  if (!media) return null;

  const title = 'title' in media ? media.title : media.name;
  const releaseDate = 'release_date' in media ? media.release_date : media.first_air_date;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      <div 
        className="h-[50vh] relative bg-cover bg-center"
        style={{ backgroundImage: `url(${getImageUrl(media.backdrop_path, 'original')})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-6 shadow-xl"
        >
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <img
                src={getImageUrl(media.poster_path)}
                alt={title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="md:col-span-2">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>{media.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(releaseDate).getFullYear()}</span>
                </div>
              </div>

              <p className="text-gray-300 mb-8">{media.overview}</p>

              <VideoPlayer
                tmdbId={media.id}
                type={type as 'movie' | 'tv'}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}