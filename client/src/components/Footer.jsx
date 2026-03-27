import { Globe, Mail, Phone, MapPin, Send, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A1F2E] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-[#1BA98C]" />
              <span className="font-['Playfair_Display'] text-2xl font-bold tracking-tight text-white">Explore India</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Crafting unforgettable journeys across the mystical landscapes of India. We specialize in authentic experiences that connect you with the soul of the subcontinent.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1BA98C] transition-all duration-300 border border-white/10 group">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1BA98C] transition-all duration-300 border border-white/10 group">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1BA98C] transition-all duration-300 border border-white/10 group">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1BA98C] transition-all duration-300 border border-white/10 group">
                <svg className="h-5 w-5 text-gray-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#1BA98C] rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/destinations" className="hover:text-[#1BA98C] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-[#1BA98C] mr-0 group-hover:mr-2 transition-all"></span>All Destinations</Link></li>
              <li><Link to="/stories" className="hover:text-[#1BA98C] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-[#1BA98C] mr-0 group-hover:mr-2 transition-all"></span>Travel Stories</Link></li>
              <li><Link to="/wishlist" className="hover:text-[#1BA98C] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-[#1BA98C] mr-0 group-hover:mr-2 transition-all"></span>Your Wishlist</Link></li>
              <li><Link to="/my-bookings" className="hover:text-[#1BA98C] transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-0.5 bg-[#1BA98C] mr-0 group-hover:mr-2 transition-all"></span>My Bookings</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Contact Detail
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#1BA98C] rounded-full"></span>
            </h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-[#1BA98C]/10 flex items-center justify-center flex-shrink-0 border border-[#1BA98C]/20">
                  <MapPin className="h-5 w-5 text-[#1BA98C]" />
                </div>
                <span className="text-sm leading-relaxed">123 Tourism Hub, Connaught Place,<br />New Delhi, India 110001</span>
              </li>
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-[#1BA98C]/10 flex items-center justify-center flex-shrink-0 border border-[#1BA98C]/20">
                  <Phone className="h-5 w-5 text-[#1BA98C]" />
                </div>
                <a href="tel:+9198765XXXXX" className="text-sm hover:text-white transition">+91 98765 XXXXX</a>
              </li>
              <li className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-[#1BA98C]/10 flex items-center justify-center flex-shrink-0 border border-[#1BA98C]/20">
                  <Mail className="h-5 w-5 text-[#1BA98C]" />
                </div>
                <a href="mailto:support@exploreindia.com" className="text-sm hover:text-white transition">support@exploreindia.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-8 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-[#1BA98C] rounded-full"></span>
            </h4>
            <p className="text-gray-400 text-sm mb-6 underline decoration-[#1BA98C]/30 underline-offset-4">Subscribe for travel tips & exclusive offers.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-6 text-sm focus:outline-none focus:border-[#1BA98C] transition-colors"
              />
              <button className="absolute right-2 top-2 h-10 w-10 bg-[#1BA98C] rounded-full flex items-center justify-center hover:bg-[#158f76] transition-colors shadow-lg shadow-[#1BA98C]/20">
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Explore India. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
