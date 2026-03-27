import { Link, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { Globe } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    relative py-2 font-medium transition-colors
    ${isActive(path) ? 'text-[#1BA98C]' : 'text-gray-700 hover:text-[#1BA98C]'}
  `;

  const highlighter = (path) => isActive(path) && (
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1BA98C] rounded-full scale-x-100 transition-transform origin-left"></span>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Globe className="h-8 w-8 text-[#1BA98C]" />
            <span className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E]">Explore India</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className={linkClass('/')}>
              Home
              {highlighter('/')}
            </Link>
            <Link to="/destinations" className={linkClass('/destinations')}>
              Destinations
              {highlighter('/destinations')}
            </Link>
            <Link to="/stories" className={linkClass('/stories')}>
              Travel Stories
              {highlighter('/stories')}
            </Link>
            <Link to="/wishlist" className={linkClass('/wishlist')}>
              Wishlist
              {highlighter('/wishlist')}
            </Link>
            {user && (
              <Link to="/my-bookings" className={linkClass('/my-bookings')}>
                My Bookings
                {highlighter('/my-bookings')}
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden sm:block">
                  <span className="text-sm text-gray-500 mr-2">Hello,</span>
                  <Link to="/profile" className="font-semibold text-gray-800 hover:text-[#1BA98C]">{user.name}</Link>
                </div>
                <button 
                  onClick={logout}
                  className="text-gray-600 hover:text-red-500 font-medium px-3 py-2 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login"
                className="bg-[#1BA98C] text-white px-5 py-2 rounded-full font-medium hover:bg-[#158f76] transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
