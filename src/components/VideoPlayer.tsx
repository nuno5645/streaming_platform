import { useEffect, useRef, useState } from 'react';
import { Loader2, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { VIDEO_SOURCES, type VideoSource } from '../types/source';
import SourceModal from './SourceModal';
import EpisodeSelector from './EpisodeSelector';

interface Props {
  tmdbId: number;
  type: 'movie' | 'tv';
  initialSeason?: number;
  initialEpisode?: number;
}

export default function VideoPlayer({ tmdbId, type, initialSeason = 1, initialEpisode = 1 }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<VideoSource>(VIDEO_SOURCES[0]);
  const [season, setSeason] = useState(initialSeason);
  const [episode, setEpisode] = useState(initialEpisode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const getEmbedUrl = (source: VideoSource) => {
    const path = type === 'movie' ? source.movie_path : source.tv_show_path;
    return source.base_url + path
      .replace('{id}', tmdbId.toString())
      .replace('{season}', season.toString())
      .replace('{episode}', episode.toString());
  };

  const handleSourceChange = (source: VideoSource) => {
    setSelectedSource(source);
    setIsSourceModalOpen(false);
    setIsLoading(true);
  };

  const handleEpisodeChange = (newSeason: number, newEpisode: number) => {
    setSeason(newSeason);
    setEpisode(newEpisode);
    setIsLoading(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h3 className="text-lg font-semibold">Now Playing from {selectedSource.name}</h3>
        <div className="flex items-center gap-4">
          {type === 'tv' && (
            <EpisodeSelector
              tmdbId={tmdbId}
              currentSeason={season}
              currentEpisode={episode}
              onSelect={handleEpisodeChange}
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSourceModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Change Source</span>
          </motion.button>
        </div>
      </div>

      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={getEmbedUrl(selectedSource)}
          className="w-full h-full"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <SourceModal
        isOpen={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        sources={VIDEO_SOURCES.filter(source => 
          type === 'movie' || source.has_tv_shows
        )}
        selectedSource={selectedSource}
        onSelectSource={handleSourceChange}
      />
    </div>
  );
}