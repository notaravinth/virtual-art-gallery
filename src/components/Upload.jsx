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
      const cleanFileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      // FIXED: Changed to lowercase 'gallery' to match your dashboard
      const { data, error: storageError } = await supabase.storage
        .from('gallery') 
        .upload(cleanFileName, file);

      if (storageError) throw storageError;

      // FIXED: Changed to lowercase 'gallery'
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(cleanFileName);

      // Save to SQL table 'artworks'
      const { error: dbError } = await supabase
        .from('artworks')
        .insert([{ 
          title: title, 
          image_url: publicUrl, 
          user_id: auth.currentUser.uid 
        }]);

      if (dbError) throw dbError;

      alert("Upload Successful!");
      navigate('/');
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Upload Artwork</h2>
      <form onSubmit={handleUpload} className="space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 border rounded" 
          onChange={(e) => setTitle(e.target.value)} required />
        <input type="file" className="w-full" 
          onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Uploading..." : "Publish"}
        </button>
      </form>
    </div>
  );
}