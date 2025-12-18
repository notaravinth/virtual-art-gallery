import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { supabase } from '../supabaseClient';
import ArtCard from './ArtCard';

export default function Profile() {
  const [myArts, setMyArts] = useState([]);

  const fetchUserArt = async () => {
    if (!auth.currentUser) return;
    const { data, error } = await supabase
      .from('artworks')
      .select('*')
      .eq('user_id', auth.currentUser.uid) 
      .order('created_at', { ascending: false });

    if (!error) setMyArts(data || []);
  };

  useEffect(() => {
    fetchUserArt();
  }, []);

  if (!auth.currentUser) return <div className="p-10 text-center">Please login.</div>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-10 text-center">My Private Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {myArts.map((art) => (
          <ArtCard key={art.id} art={art} onDeleted={fetchUserArt} />
        ))}
      </div>
      {myArts.length === 0 && <p className="text-center text-gray-500 mt-10">No art found.</p>}
    </div>
  );
}