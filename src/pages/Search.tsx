import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, Loader2, Film, Tv } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import MediaGrid from '../components/MediaGrid';
import SearchBar from '../components/SearchBar';
import { searchMulti } from '../services/tmdb';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'tv'>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: () => searchMulti(query),
    enabled: query.length > 0,
  });

  const filteredResults = data?.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'movies') return item.media_type === 'movie';
    return item.media_type === 'tv';
  });

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto mb-8">
          <SearchBar defaultValue={query} />
        </div>

        {query && (
          <>
            <div className="flex items-center justify-center gap-4 mb-8">
              {tabs.map(({ id, label, icon: Icon }) => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{label}</span>
                  {data && (
                    <span className="text-sm bg-black/20 px-2 py-0.5 rounded-full">
                      {id === 'all'
                        ? data.length
                        : data.filter(item => 
                            id === 'movies' 
                              ? item.media_type === 'movie' 
                              : item.media_type === 'tv'
                          ).length}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
            ) : filteredResults && filteredResults.length > 0 ? (
              <MediaGrid
                items={filteredResults}
                type={activeTab === 'movies' ? 'movie' : 'tv'}
              />
            ) : (
              <div className="text-center py-12">
                <SearchIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                <h2 className="text-2xl font-semibold mb-2">No results found</h2>
                <p className="text-gray-400">
                  Try adjusting your search or filter to find what you're looking for
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}