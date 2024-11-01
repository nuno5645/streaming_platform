const API_KEY = '2480c2206d4661b89bf222cbc9c7f5ea';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export async function getTrending(type: 'movie' | 'tv', category: 'trending' | 'top_rated' | 'upcoming' | 'popular' = 'trending') {
  const endpoint = category === 'trending' 
    ? `/trending/${type}/week` 
    : `/${type}/${category}`;
    
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}`
  );
  const data = await response.json();
  return data.results;
}

export function getImageUrl(path: string, size: 'w500' | 'original' = 'w500') {
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export async function getDetails(type: 'movie' | 'tv', id: string) {
  const response = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  return await response.json();
}

export async function searchMulti(query: string) {
  if (!query) return [];
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`
  );
  const data = await response.json();
  return data.results.filter((item: any) => 
    item.media_type === 'movie' || item.media_type === 'tv'
  );
}