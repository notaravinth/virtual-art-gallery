import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';    // Firebase for User ID
import { supabase } from '../supabaseClient'; // Supabase for Data

export default function Profile() {
  const [myArts, setMyArts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserArt() {
      if (!auth.currentUser) return; // Wait for user to be logged in

      // Query Supabase for art where user_id matches the Firebase UID
      const { data, error } = await supabase
        .from('artworks')
        .select('*')
        .eq('user_id', auth.currentUser.uid) 
        .order('created_at', { ascending: false });

      if (!error) setMyArts(data);
      setLoading(false);
    }

    fetchUserArt();
  }, []);

  if (!auth.currentUser) return <div className="p-10 text-center">Please login to view your profile.</div>;

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">My Creative Studio</h1>
        <p className="text-gray-600">{auth.currentUser.email}</p>
      </div>

      {loading ? (
        <p className="text-center">Loading your collection...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {myArts.map((art) => (
            <div key={art.id} className="border rounded-lg shadow-sm">
              <img src={art.image_url} alt={art.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{art.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && myArts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">You haven't published any art yet.</p>
      )}
    </div>
  );
}