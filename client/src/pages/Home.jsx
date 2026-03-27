import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Compass, Mountain, Umbrella, Palmtree, Map, ArrowRight } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';
import { destinations } from '../data/destinations';

const categories = [
  { name: 'Spiritual', icon: <Compass className="w-8 h-8" />, color: 'bg-[#FEF3E2]', text: 'text-orange-600', count: 10 },
  { name: 'Hill Stations', icon: <Mountain className="w-8 h-8" />, color: 'bg-[#D1FAE5]', text: 'text-emerald-600', count: 10 },
  { name: 'Beaches', icon: <Umbrella className="w-8 h-8" />, color: 'bg-[#DBEAFE]', text: 'text-blue-600', count: 10 },
  { name: 'Wildlife', icon: <Palmtree className="w-8 h-8" />, color: 'bg-[#DCFCE7]', text: 'text-green-600', count: 10 },
  { name: 'Cultural', icon: <Map className="w-8 h-8" />, color: 'bg-[#EDE9FE]', text: 'text-purple-600', count: 10 },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [budget, setBudget] = useState('20000');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() || budget !== '20000') {
      navigate(`/destinations?search=${encodeURIComponent(searchTerm)}&budget=${budget}`);
    } else {
      navigate(`/destinations`);
    }
  };

  const getPreviews = (categoryName) => {
    return destinations
      .filter(d => d.category === categoryName.toLowerCase())
      .slice(0, 4);
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1585506942812-e72b29cef752?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Taj Mahal India" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Explore Incredible India
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto drop-shadow-md">
            Discover a land of vibrant culture, rich heritage, and breathtaking landscapes. Your unforgettable journey starts here.
          </p>
          
          <form onSubmit={handleSearch} className="bg-white p-2 rounded-full shadow-2xl flex items-center max-w-3xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 ml-4 hidden sm:block" />
            <input 
              type="text"
              placeholder="Where do you want to go?"
              className="flex-1 px-4 py-3 outline-none text-base sm:text-lg bg-transparent border-r border-gray-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="px-2 sm:px-4 py-3 outline-none bg-transparent text-gray-600 font-medium cursor-pointer"
            >
              <option value="20000">Any Budget</option>
              <option value="5000">Below ₹5,000</option>
              <option value="10000">Below ₹10,000</option>
              <option value="15000">Below ₹15,000</option>
            </select>
            <button 
              type="submit"
              className="bg-[#1BA98C] text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-[#158f76] transition-colors ml-2"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#1A1F2E] mb-4">Choose Your Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">From serene beaches to majestic mountains, find the perfect destination that matches your travel style.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link 
                to={`/destinations?category=${cat.name.toLowerCase()}`}
                key={cat.name} 
                className={`${cat.color} rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300`}
              >
                <div className={`w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform ${cat.text}`}>
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-lg">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count} Destinations</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Previews */}
      <section className="py-20 bg-[#F5F3EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.slice(0, 3).map((category, idx) => (
            <div key={category.name} className={idx > 0 ? "mt-20" : ""}>
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#1A1F2E] mb-2">Top {category.name}</h2>
                  <p className="text-gray-600">Discover our handpicked {category.name.toLowerCase()} for your next trip.</p>
                </div>
                <Link 
                  to={`/destinations?category=${category.name.toLowerCase()}`}
                  className="hidden sm:flex items-center text-[#1BA98C] font-semibold hover:text-[#158f76] transition-colors"
                >
                  View All <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {getPreviews(category.name).map(dest => (
                  <DestinationCard key={dest.slug} destination={dest} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-[#1A1F2E] mb-4">Traveler Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Read about the amazing experiences of our travelers across India.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "A Spiritual Journey to Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80", text: "The ghats of Varanasi offer a surreal experience that stays with you forever." },
              { title: "Exploring the Backwaters of Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80", text: "Cruising through the peaceful backwaters was the highlight of our entire trip." },
              { title: "The Majestic Forts of Rajasthan", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80", text: "Stepping into these ancient forts feels like traveling back in time to the era of kings." }
            ].map((story, i) => (
              <Link to="/stories" key={i} className="bg-white rounded-2xl overflow-hidden shadow-md group border border-gray-100 cursor-pointer block">
                <div className="overflow-hidden h-64">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-['Playfair_Display'] text-xl font-bold mb-3">{story.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{story.text}</p>
                  <span className="inline-block mt-4 text-[#E07B39] font-medium group-hover:translate-x-2 transition-transform">Read Story →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=1920&q=80" 
            alt="India Landscape" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1A1F2E] mix-blend-multiply opacity-80" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="font-['Playfair_Display'] text-5xl font-bold text-white mb-6">Ready to Explore India?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers who have discovered the magic of India with our expertly crafted itineraries and seamless booking experience.
          </p>
          <Link 
            to="/destinations" 
            className="inline-block bg-[#E07B39] text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-[#c6682b] transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Start Planning Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
