import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, MapPin, Heart, Plus, Minus, Calendar as CalendarIcon, Users, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { destinations } from '../data/destinations';
import useAuthStore from '../store/authStore';
import useWishlistStore from '../store/wishlistStore';

const DestinationDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  const { toggle, items } = useWishlistStore();
  
  const destination = destinations.find(d => d.slug === slug);
  const isWishlisted = items.some(item => item.destinationSlug === slug);

  const [travelDate, setTravelDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewCount, setReviewCount] = useState(destination?.reviewCount || 0);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    if (destination) {
      axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews/${slug}`)
        .then(res => setReviews(res.data))
        .catch(err => console.error('Error fetching reviews:', err));
    }
  }, [slug, destination]);

  if (!destination) {
    return <div className="text-center py-40 text-2xl font-['Playfair_Display']">Destination Not Found.</div>;
  }

  const totalPrice = destination.price * travelers;

  const handleBooking = async () => {
    if (!user) return navigate('/login');
    if (!travelDate) return toast.error('Please select a travel date');
    
    setBookingLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings`, {
        destinationSlug: destination.slug,
        destinationName: destination.name,
        travelDate,
        travelers,
        totalPrice
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Booking confirmed! Check My Bookings.');
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleWishlist = async () => {
    if (!user) return navigate('/login');
    const success = await toggle(destination);
    if (success) toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (!newReview.comment.trim()) return toast.error('Please write a comment');
    
    setReviewLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews`, {
        destinationSlug: destination.slug,
        rating: newReview.rating,
        comment: newReview.comment
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      setReviews([res.data, ...reviews]);
      setReviewCount(prev => prev + 1);
      setNewReview({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Review failed');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <div className="bg-[#F5F3EE] min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px]">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 flex flex-col lg:flex-row gap-8">
        {/* Left Column (Main Content) */}
        <div className="flex-1 bg-white rounded-3xl p-8 shadow-xl relative">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-500 hover:text-[#1BA98C] transition-colors mb-6 font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#1A1F2E] mb-2">{destination.name}</h1>
              <div className="flex items-center text-gray-600 gap-4">
                <span className="flex items-center"><MapPin className="w-5 h-5 mr-1" /> {destination.state}, {destination.region}</span>
                <span className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm font-semibold">
                  <Star className="w-4 h-4 fill-green-700 mr-1" /> {destination.rating} ({reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {destination.tags.map(tag => (
              <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm capitalize">{tag}</span>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{destination.description}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-4">Top Attractions</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {destination.attractions.map((attr, i) => <li key={i}>{attr}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-4">How to Reach</h2>
              <ul className="space-y-3 text-gray-700">
                <li><strong>✈️ Air:</strong> {destination.howToReach.air}</li>
                <li><strong>🚂 Rail:</strong> {destination.howToReach.rail}</li>
                <li><strong>🚘 Road:</strong> {destination.howToReach.road}</li>
              </ul>
            </div>
          </div>

          <section className="mb-10">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-4">Best Time to Visit</h2>
            <p className="text-gray-700 bg-orange-50 p-4 rounded-xl border border-orange-100">{destination.bestTime}</p>
          </section>

          <section className="mb-12">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-6">Itinerary</h2>
            <div className="space-y-6">
              {destination.itinerary.map((day, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1BA98C]/10 rounded-full flex items-center justify-center text-[#1BA98C] font-bold">
                    D{day.day}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800">{day.title}</h4>
                    <p className="text-gray-600 mt-1">{day.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          {/* Reviews Section */}
          <section className="border-t border-gray-100 pt-10">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-8">Guest Reviews</h2>
            <div className="space-y-6 mb-10">
              {reviews.length === 0 ? <p className="text-gray-500 italic">No reviews yet. Be the first!</p> :
                reviews.map(rev => (
                  <div key={rev._id} className="bg-gray-50 p-5 rounded-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-800">{rev.userName}</span>
                      <span className="text-sm text-gray-500">{new Date(rev.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex text-orange-400 mb-2">
                      {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= rev.rating ? 'fill-orange-400' : 'text-gray-300'}`} />)}
                    </div>
                    <p className="text-gray-700">{rev.comment}</p>
                  </div>
                ))
              }
            </div>

            {user ? (
              <form onSubmit={submitReview} className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 className="font-bold text-lg mb-4">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select value={newReview.rating} onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })} className="w-full bg-white p-3 rounded-xl border border-gray-300 outline-none">
                    {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                  <textarea rows="3" value={newReview.comment} onChange={e => setNewReview({ ...newReview, comment: e.target.value })} className="w-full bg-white p-3 rounded-xl border border-gray-300 outline-none" placeholder="Share your experience..."></textarea>
                </div>
                <button type="submit" disabled={reviewLoading} className="bg-[#1A1F2E] text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition">
                  {reviewLoading ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            ) : (
              <p className="text-gray-500 mt-4 bg-gray-50 p-4 rounded-xl inline-block">Please <Link to="/login" className="text-[#1BA98C] hover:underline font-medium">login</Link> to write a review.</p>
            )}
          </section>
        </div>

        {/* Right Column (Sticky Booking Card) */}
        <div className="lg:w-[400px]">
          <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border-t-4 border-[#1BA98C]">
            <div className="mb-6 pb-6 border-b border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold text-[#1A1F2E]">₹{destination.price.toLocaleString('en-IN')}</p>
                <p className="text-gray-500 text-sm">per person</p>
              </div>
              <button onClick={handleWishlist} className={`p-3 rounded-full bg-gray-50 hover:bg-gray-100 transition shadow-sm border border-gray-100`}>
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><CalendarIcon className="w-4 h-4 mr-2" /> Travel Date</label>
                <input 
                  type="date" 
                  min={new Date().toISOString().split('T')[0]}
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-gray-50 p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-[#1BA98C]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center"><Users className="w-4 h-4 mr-2" /> Travelers</label>
                <div className="flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <button onClick={() => setTravelers(Math.max(1, travelers - 1))} className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 text-[#1BA98C]"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold text-lg w-10 text-center">{travelers}</span>
                  <button onClick={() => setTravelers(travelers + 1)} className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 text-[#1BA98C]"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 pt-4 border-t border-gray-100">
              <span className="font-semibold text-gray-800">Total Price</span>
              <span className="font-bold text-2xl text-[#E07B39]">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <button 
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full bg-[#1BA98C] text-white py-4 rounded-full font-bold text-lg hover:bg-[#158f76] transition-colors shadow-lg shadow-[#1BA98C]/30 disabled:opacity-70"
            >
              {bookingLoading ? 'Processing...' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;
