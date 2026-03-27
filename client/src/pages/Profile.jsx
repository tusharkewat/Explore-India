import { useEffect, useState } from 'react';
import { User, Mail, Calendar, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { token, logout, user } = useAuthStore();
  const [profileData, setProfileData] = useState(user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfileData(res.data);
      } catch (err) {
        console.error('Error fetching profile', err);
      }
    };
    if (token) fetchProfile();
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!profileData) return <div className="min-h-[60vh] flex justify-center items-center">Loading...</div>;

  return (
    <div className="bg-[#F5F3EE] min-h-[80vh] py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#1A1F2E] h-32 relative">
            <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-full p-1 shadow-lg">
              <div className="w-full h-full bg-[#1BA98C] rounded-full flex justify-center items-center text-white text-4xl font-bold font-['Playfair_Display']">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          
          <div className="px-8 pt-16 pb-8">
            <h1 className="font-['Playfair_Display'] text-3xl font-bold text-[#1A1F2E] mb-1">{profileData.name}</h1>
            <p className="text-gray-500 flex items-center mb-8"><Mail className="w-5 h-5 mr-2" /> {profileData.email}</p>
            
            <div className="space-y-6 max-w-md">
              <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#E07B39]/10 rounded-full flex justify-center items-center text-[#E07B39] mr-4">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <p className="font-semibold text-gray-800">Active Member</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#1BA98C]/10 rounded-full flex justify-center items-center text-[#1BA98C] mr-4">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-800">
                    {profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Recently'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-gray-100">
              <button 
                onClick={handleLogout}
                className="flex items-center text-red-500 font-semibold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
