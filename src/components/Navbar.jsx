import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { auth } from '../firebase/config';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300"
            >
              Virtual Gallery
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
              Explore
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-6">
                <Link 
                  to="/upload" 
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95"
                >
                  Upload Art
                </Link>
                <Link to={`/profile/${user.uid}`} className="text-gray-600 hover:text-blue-600 font-medium transition">
                  My Gallery
                </Link>
                <button 
                  onClick={() => auth.signOut()} 
                  className="text-gray-400 hover:text-red-500 text-sm font-medium border-l pl-6 border-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-600 hover:text-blue-600 font-medium transition px-3 py-2"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-gray-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-black transition-all active:scale-95 shadow-md"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon (Visual Only for now) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}