import { Heart, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';

const DestinationCard = ({ destination }) => {
  const { toggle, items } = useWishlistStore();
  const { user } = useAuthStore();
  const isWishlisted = items.some(item => item.destinationSlug === destination.slug);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }
    
    const success = await toggle(destination);
    if (success) {
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
    }
  };

  return (
    <Link to={`/destination/${destination.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <button 
          onClick={handleWishlist}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-red-500 transition-colors shadow-sm"
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-['Playfair_Display'] text-xl font-bold text-[#1A1F2E] mb-1">
              {destination.name}
            </h3>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-4 w-4 mr-1" />
              {destination.state}
            </div>
          </div>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded-md text-green-700 font-medium text-sm">
            <Star className="h-4 w-4 fill-green-700 mr-1" />
            {destination.rating}
          </div>
        </div>
        
        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-gray-500 text-sm">Starting from</p>
            <p className="text-lg font-bold text-[#1BA98C]">₹{destination.price.toLocaleString('en-IN')}<span className="text-sm font-normal text-gray-500">/person</span></p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;
