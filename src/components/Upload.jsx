import { useState } from 'react';
import { supabase } from '../supabaseClient'; 
import { auth } from '../firebase/config';    
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !auth.currentUser) return alert("Log in first!");

    setLoading(true);
    try {
      // Step 1: Clean the filename (no spaces, no special chars)
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      
      // Step 2: Match your dashboard casing: 'GALLERY'
      const { data, error: storageError } = await supabase.storage
        .from('GALLERY') 
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (storageError) throw new Error(storageError.message);

      // Step 3: Generate the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('GALLERY')
        .getPublicUrl(fileName);

      // Step 4: Save to 'artworks' table
      const { error: dbError } = await supabase
        .from('artworks')
        .insert([{ 
          title: title, 
          image_url: publicUrl, 
          user_id: auth.currentUser.uid 
        }]);

      if (dbError) throw new Error(dbError.message);

      alert("Uploaded successfully!");
      navigate('/');
    } catch (err) {
      alert("Error: " + err.message); // This will tell us if it's still "Bucket not found"
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg mt-10 rounded">
      <h2 className="text-xl font-bold mb-4">Upload New Artwork</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" placeholder="Title" className="w-full border p-2" onChange={(e)=>setTitle(e.target.value)} required />
        <input type="file" className="w-full" onChange={(e)=>setFile(e.target.files[0])} required />
        <button className="w-full bg-blue-600 text-white p-2 rounded disabled:bg-gray-400" disabled={loading}>
          {loading ? "Publishing..." : "Publish"}
        </button>
      </form>
    </div>
  );
}