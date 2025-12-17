import { useState } from 'react';
import { storage, db, auth } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title) return alert("Please select a file and enter a title");
    
    setLoading(true);
    try {
      const storageRef = ref(storage, `artworks/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "artworks"), {
        title,
        imageUrl: url,
        ownerId: auth.currentUser.uid,
        artist: auth.currentUser.email,
        createdAt: new Date()
      });
      alert("Art Published!");
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow mt-10 rounded">
      <h2 className="text-xl font-bold mb-4">Upload New Artwork</h2>
      <form onSubmit={handleUpload} className="flex flex-col gap-4">
        <input type="text" placeholder="Artwork Title" className="border p-2" onChange={(e)=>setTitle(e.target.value)} required />
        <input type="file" onChange={(e)=>setFile(e.target.files[0])} required />
        <button disabled={loading} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {loading ? "Uploading..." : "Publish Art"}
        </button>
      </form>
    </div>
  );
}