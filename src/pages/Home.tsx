import { useQuery } from '@tanstack/react-query';
import { getTrending } from '../services/tmdb';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import MediaGrid from '../components/MediaGrid';
import { Film, Flame, Star, Clock, Heart } from 'lucide-react';

export default function Home() {
  const { data: trendingMovies } = useQuery({
    queryKey: ['trending', 'movie'],
    queryFn: () => getTrending('movie'),
  });

  const { data: topRatedMovies } = useQuery({
    queryKey: ['top-rated', 'movie'],
    queryFn: () => getTrending('movie', 'top_rated'),
  });

  const { data: upcomingMovies } = useQuery({
    queryKey: ['upcoming', 'movie'],
    queryFn: () => getTrending('movie', 'upcoming'),
  });

  const { data: popularMovies } = useQuery({
    queryKey: ['popular', 'movie'],
    queryFn: () => getTrending('movie', 'popular'),
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      
      {trendingMovies && trendingMovies.length > 0 && (
        <HeroSection media={trendingMovies[0]} type="movie" />
      )}

      <main className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-semibold">Trending Now</h2>
          </div>
          {trendingMovies && <MediaGrid items={trendingMovies} type="movie" />}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-semibold">Top Rated</h2>
          </div>
          {topRatedMovies && <MediaGrid items={topRatedMovies} type="movie" />}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-semibold">Coming Soon</h2>
          </div>
          {upcomingMovies && <MediaGrid items={upcomingMovies} type="movie" />}
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-semibold">Popular Movies</h2>
          </div>
          {popularMovies && <MediaGrid items={popularMovies} type="movie" />}
        </section>
      </main>
    </div>
  );
}