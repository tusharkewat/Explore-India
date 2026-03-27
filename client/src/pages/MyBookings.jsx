import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/bookings/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings', err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchBookings();
  }, [token]);

  if (loading) return <div className="min-h-screen py-20 text-center font-['Playfair_Display'] text-xl">Loading your bookings...</div>;

  return (
    <div className="bg-[#F5F3EE] min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#1A1F2E] mb-2">My Bookings</h1>
        <p className="text-gray-600 mb-10">Manage and view your upcoming and past travels.</p>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-800 mb-3">No bookings yet</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't planned any trips with us. Start exploring and find your next adventure!</p>
            <Link to="/destinations" className="bg-[#1BA98C] text-white px-8 py-3 rounded-full font-medium hover:bg-[#158f76] transition-colors inline-block">
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map(booking => (
              <div key={booking._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed
                    </span>
                    <span className="text-gray-400 text-sm">Booking ID: {booking._id.slice(-8).toUpperCase()}</span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#1A1F2E] mb-4">
                    <Link to={`/destination/${booking.destinationSlug}`} className="hover:text-[#1BA98C] transition-colors">
                      {booking.destinationName}
                    </Link>
                  </h3>
                  
                  <div className="flex flex-wrap gap-6 text-gray-600">
                    <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-[#1BA98C]" /> {new Date(booking.travelDate).toLocaleDateString()}</div>
                    <div className="flex items-center"><Users className="w-4 h-4 mr-2 text-[#1BA98C]" /> {booking.travelers} Traveler{booking.travelers > 1 ? 's' : ''}</div>
                  </div>
                </div>
                
                <div className="text-left md:text-right w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <p className="text-sm text-gray-500 mb-1">Total Amount Paid</p>
                  <p className="text-3xl font-bold text-[#E07B39]">₹{booking.totalPrice.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
