import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ArtCard from './ArtCard';

export default function Home() {
  const [arts, setArts] = useState([]);

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setArts(data || []);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Community Art Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {arts.map((art) => (
          <ArtCard key={art.id} art={art} onDeleted={fetchGallery} />
        ))}
      </div>
    </div>
  );
}