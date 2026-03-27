import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

const categories = ['All', 'Spiritual', 'Hill Stations', 'Beaches', 'Wildlife', 'Cultural'];

const Destinations = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';
  const initialBudget = searchParams.get('budget') ? Number(searchParams.get('budget')) : 20000;
  
  const [activeTab, setActiveTab] = useState(initialCategory.toLowerCase());
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [maxBudget, setMaxBudget] = useState(initialBudget);

  useEffect(() => {
    if (searchParams.get('category')) {
      setActiveTab(searchParams.get('category').toLowerCase());
    }
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search'));
    }
    if (searchParams.get('budget')) {
      setMaxBudget(Number(searchParams.get('budget')));
    }
  }, [searchParams]);

  const filteredDestinations = useMemo(() => {
    return destinations.filter(dest => {
      const matchCategory = activeTab === 'all' || dest.category.toLowerCase() === activeTab;
      const matchSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dest.state.toLowerCase().includes(searchTerm.toLowerCase());
      const matchBudget = dest.price <= maxBudget;
      return matchCategory && matchSearch && matchBudget;
    });
  }, [activeTab, searchTerm, maxBudget]);

  return (
    <div className="bg-[#F5F3EE] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Tabs */}
        <div className="mb-10">
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-[#1A1F2E] mb-6">Discover Destinations</h1>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => {
                const isActive = activeTab === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setActiveTab(cat.toLowerCase());
                      setSearchParams({ category: cat.toLowerCase(), ...(searchTerm && { search: searchTerm }), budget: maxBudget.toString() });
                    }}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive 
                      ? 'bg-[#1BA98C] text-white shadow-md' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-center w-full md:w-auto mt-4 md:mt-0">
              <div className="flex flex-col w-full min-w-[200px]">
                <label className="text-sm text-gray-500 font-medium mb-2">Max Budget: ₹{maxBudget.toLocaleString('en-IN')}</label>
                <input 
                  type="range" 
                  min="2000" 
                  max="20000" 
                  step="500"
                  value={maxBudget}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMaxBudget(val);
                    setSearchParams({ ...(activeTab !== 'all' && { category: activeTab }), ...(searchTerm && { search: searchTerm }), budget: val.toString() });
                  }}
                  className="w-full accent-[#1BA98C]"
                />
              </div>

              <div className="relative w-full md:w-auto min-w-[250px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or state..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearchParams({ ...(activeTab !== 'all' && { category: activeTab }), search: e.target.value, budget: maxBudget.toString() });
                  }}
                  className="pl-10 w-full bg-white border-0 py-2.5 rounded-full shadow-sm focus:ring-2 focus:ring-[#1BA98C] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDestinations.map(dest => (
              <DestinationCard key={dest.slug} destination={dest} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h3 className="text-2xl font-['Playfair_Display'] text-gray-800 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or changing the category tab.</p>
            <button 
              onClick={() => { setActiveTab('all'); setSearchTerm(''); setMaxBudget(20000); setSearchParams({}); }}
              className="mt-6 text-[#1BA98C] font-semibold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Destinations;
