import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    async function fetchGallery() {
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error) setArts(data || []);
    }
    fetchGallery();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-center mb-8">Community Art Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {arts.map((art) => (
          <div key={art.id} className="border rounded-lg overflow-hidden shadow-sm">
            <img src={art.image_url} alt={art.title} className="w-full h-64 object-cover border-b" />
            <div className="p-4 bg-white text-center font-bold">{art.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}