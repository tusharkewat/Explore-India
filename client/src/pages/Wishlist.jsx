import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';

const Wishlist = () => {
  const { items, fetchWishlist, toggle } = useWishlistStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <div className="bg-[#F5F3EE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#1A1F2E] mb-2 flex items-center">
          <Heart className="w-8 h-8 text-red-500 fill-red-500 mr-3" /> My Wishlist
        </h1>
        <p className="text-gray-600 mb-10">Places you've dreamed of visiting.</p>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mb-3">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't saved any destinations yet. Discover incredible places across India.</p>
            <Link to="/destinations" className="bg-[#1BA98C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#158f76] transition-colors inline-block">
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map(item => (
              <div key={item._id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Link to={`/destination/${item.destinationSlug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.destinationName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </Link>
                <div className="p-5">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A1F2E] mb-3 truncate">
                    {item.destinationName}
                  </h3>
                  <div className="flex justify-between items-center top-border border-t border-gray-100 pt-4 mt-2">
                    <p className="text-[#1BA98C] font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                    <button 
                      onClick={(e) => { e.preventDefault(); toggle({ slug: item.destinationSlug }); }}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
