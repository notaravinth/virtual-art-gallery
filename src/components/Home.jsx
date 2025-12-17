import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import ArtCard from './ArtCard';

export default function Home() {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    const getArts = async () => {
      const q = query(collection(db, "artworks"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setArts(snap.docs.map(doc => ({...doc.data(), id: doc.id})));
    };
    getArts();
  }, []);

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {arts.map(art => <ArtCard key={art.id} art={art} />)}
    </div>
  );
}