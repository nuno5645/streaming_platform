import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Film, Tv } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const location = useLocation();
  
  const links = [
    { to: '/', icon: Film, label: 'Movies' },
    { to: '/tv', icon: Tv, label: 'TV Shows' },
  ];

  const isSearchPage = location.pathname === '/search';

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-gray-900/90 to-gray-900/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text whitespace-nowrap"
            >
              Flix 🏴‍☠️
            </motion.h1>
          </Link>

          {!isSearchPage && (
            <div className="flex-1 max-w-xl">
              <SearchBar variant="compact" />
            </div>
          )}

          <div className="hidden md:flex items-center space-x-6">
            {links.map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to}>
                <motion.div
                  className="flex items-center space-x-2 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                  {location.pathname === to && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-500"
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}