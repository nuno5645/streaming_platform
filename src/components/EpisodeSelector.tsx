import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, Loader2 } from 'lucide-react';

interface Episode {
  id: number;
  name: string;
  episode_number: number;
  air_date: string;
}

interface Season {
  id: number;
  name: string;
  season_number: number;
  episodes: Episode[];
}

interface Props {
  tmdbId: number;
  currentSeason: number;
  currentEpisode: number;
  onSelect: (season: number, episode: number) => void;
}

async function fetchSeasons(tmdbId: number): Promise<Season[]> {
  const API_KEY = '2480c2206d4661b89bf222cbc9c7f5ea';
  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${tmdbId}?api_key=${API_KEY}&append_to_response=season/1,season/2,season/3,season/4,season/5`
  );
  const data = await response.json();
  
  const seasons: Season[] = [];
  for (let i = 1; i <= data.number_of_seasons; i++) {
    const seasonResponse = await fetch(
      `https://api.themoviedb.org/3/tv/${tmdbId}/season/${i}?api_key=${API_KEY}`
    );
    const seasonData = await seasonResponse.json();
    seasons.push({
      id: seasonData.id,
      name: seasonData.name,
      season_number: seasonData.season_number,
      episodes: seasonData.episodes,
    });
  }
  
  return seasons;
}

export default function EpisodeSelector({ tmdbId, currentSeason, currentEpisode, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: seasons, isLoading } = useQuery({
    queryKey: ['seasons', tmdbId],
    queryFn: () => fetchSeasons(tmdbId),
  });

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-4 py-2 bg-gray-700 rounded-lg">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span>Loading episodes...</span>
      </div>
    );
  }

  if (!seasons) return null;

  const currentSeasonData = seasons.find(s => s.season_number === currentSeason);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
      >
        <span>S{currentSeason} E{currentEpisode}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl z-50"
          >
            <div className="p-4 max-h-[60vh] overflow-auto">
              {seasons.map((season) => (
                <div key={season.id} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Season {season.season_number}
                  </h3>
                  <div className="grid gap-2">
                    {season.episodes.map((episode) => (
                      <motion.button
                        key={episode.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelect(season.season_number, episode.episode_number);
                          setIsOpen(false);
                        }}
                        className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                          currentSeason === season.season_number && 
                          currentEpisode === episode.episode_number
                            ? 'bg-purple-600'
                            : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                      >
                        <span className="font-medium">
                          Episode {episode.episode_number}
                        </span>
                        <span className="text-sm text-gray-300 truncate ml-2">
                          {episode.name}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}