import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../services/tmdb';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MediaGrid from '../components/MediaGrid';
import { Tv, Flame, Star, Clock, Heart } from 'lucide-react';

export default function TVShows() {
  const { data: trendingShows } = useQuery({
    queryKey: ['trending', 'tv'],
    queryFn: () => getTrending('tv'),
  });

  const { data: topRatedShows } = useQuery({
    queryKey: ['top-rated', 'tv'],
    queryFn: () => getTrending('tv', 'top_rated'),
  });

  const { data: upcomingShows } = useQuery({
    queryKey: ['upcoming', 'tv'],
    queryFn: () => getTrending('tv', 'upcoming'),
  });

  const { data: popularShows } = useQuery({
    queryKey: ['popular', 'tv'],
    queryFn: () => getTrending('tv', 'popular'),
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {trendingShows && trendingShows.length > 0 && (
        <HeroSection media={trendingShows[0]} type="tv" />
      )}

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-semibold">Trending Now</h2>
          </div>
          {trendingShows && <MediaGrid items={trendingShows} type="tv" />}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-semibold">Top Rated</h2>
          </div>
          {topRatedShows && <MediaGrid items={topRatedShows} type="tv" />}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold">Airing Today</h2>
          </div>
          {upcomingShows && <MediaGrid items={upcomingShows} type="tv" />}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-semibold">Popular Shows</h2>
          </div>
          {popularShows && <MediaGrid items={popularShows} type="tv" />}
        </section>
      </main>
    </div>
  );
}