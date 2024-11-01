import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TVShows from './pages/TVShows';
import Details from './pages/Details';
import Search from './pages/Search';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/search" element={<Search />} />
          <Route path="/:type/:id" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}