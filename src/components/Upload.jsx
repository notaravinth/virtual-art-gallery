import { useState } from 'react';
import { storage, db, auth } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !auth.currentUser) return;
    
    setLoading(true);
    try {
      // 1. Upload to Firebase Storage
      const fileRef = ref(storage, `artworks/${Date.now()}_${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      // 2. Save metadata to Firestore
      await addDoc(collection(db, "artworks"), {
        title,
        imageUrl: url,
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        createdAt: serverTimestamp()
      });

      alert("Masterpiece Published!");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Upload failed. Ensure you are logged in and CORS is configured.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-3xl font-bold mb-6 text-center">Share Art</h2>
      <form onSubmit={handleUpload} className="space-y-6">
        <input 
          type="text" placeholder="Title" required
          className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setTitle(e.target.value)} 
        />
        
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          <div className="text-center">
            <p className="text-sm text-gray-500 font-semibold">
              {file ? file.name : "Click to select artwork"}
            </p>
          </div>
          <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} required />
        </label>

        <button disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50">
          {loading ? "Uploading..." : "Publish to Gallery"}
        </button>
      </form>
    </div>
  );
}