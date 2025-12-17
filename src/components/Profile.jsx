import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ArtCard from './ArtCard';

export default function Profile() {
  const { userId } = useParams();
  const [userArts, setUserArts] = useState([]);

  useEffect(() => {
    const fetchUserArts = async () => {
      const q = query(collection(db, "artworks"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      setUserArts(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchUserArts();
  }, [userId]);

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">User Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userArts.map(art => <ArtCard key={art.id} art={art} />)}
      </div>
    </div>
  );
}