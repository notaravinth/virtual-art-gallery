import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { auth } from '../firebase/config';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Virtual Gallery
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Explore</Link>
          {user ? (
            <>
              <Link to="/upload" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition">Upload</Link>
              <Link to={`/profile/${user.uid}`} className="text-gray-600 hover:text-blue-600">My Gallery</Link>
              <button onClick={() => auth.signOut()} className="text-red-500 font-medium">Logout</button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link to="/login" className="text-gray-600 hover:text-blue-600 py-2">Login</Link>
              <Link to="/signup" className="bg-gray-900 text-white px-5 py-2 rounded-full hover:bg-black transition">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}