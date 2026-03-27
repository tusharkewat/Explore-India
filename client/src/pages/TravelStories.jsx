import { Calendar, User } from 'lucide-react';

const stories = [
  {
    id: 1,
    title: "A Spiritual Journey to Varanasi",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200&q=80",
    author: "Rahul Sharma",
    date: "October 12, 2025",
    content: `The ghats of Varanasi offer a surreal experience that stays with you forever. Waking up at 5 AM to witness the Subah-e-Banaras (morning of Banaras) was nothing short of miraculous. As the sun began to rise over the Ganges, casting a golden hue across the ancient city, the sound of temple bells and chanting mantras filled the air. 
    
    Taking a gentle boat ride along the river, I observed the beautiful chaos of life unfolding on the ghats. From the mesmerizing evening Aarti at Dashashwamedh Ghat to the narrow, winding alleys filled with the aroma of street food and incense, Varanasi is not just a destination; it's an emotion. It forces you to pause, reflect, and find peace amidst the bustling energy of India's spiritual capital.`
  },
  {
    id: 2,
    title: "Exploring the Backwaters of Kerala",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    author: "Anita Desai",
    date: "November 05, 2025",
    content: `Cruising through the peaceful backwaters was the highlight of our entire trip. The lush green palm trees swaying gently against the azure sky painted a picture of absolute tranquility. We rented a traditional houseboat in Alleppey, floating gently past small rural island villages where life moves at its own beautiful, unhurried pace.

    The local cuisine prepared aboard by our boat's private chef—spicy fish curry with locally sourced tapioca—was a culinary revelation. Waking up on the water, surrounded by the morning mist and the calls of exotic birds, provided an incredibly meditative retreat from city life. Kerala truly earns its title as "God's Own Country."`
  },
  {
    id: 3,
    title: "The Majestic Forts of Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    author: "Vikram Singh",
    date: "December 20, 2025",
    content: `Stepping into these ancient forts feels like traveling back in time to the era of kings. Our grand tour of Rajasthan started in Jaipur with the magnificent Amber Fort, standing tall against the rugged hills. Every carved pillar, every mirrored ceiling of the Sheesh Mahal told tales of immense wealth, valor, and royal extravaganzas.

    Moving on to the imposing Mehrangarh Fort in Jodhpur, the view of the "Blue City" from the ramparts was absolutely breathtaking. We concluded our historic trail in Udaipur, watching a spectacular cultural dance performance near the city palace. Rajasthan's architectural magnificence is a proud testament to India's glorious royal history, leaving every visitor completely spellbound.`
  }
];

const TravelStories = () => {
  return (
    <div className="bg-[#F5F3EE] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-['Playfair_Display'] text-5xl font-bold text-[#1A1F2E] mb-4">Travel Stories</h1>
          <p className="text-xl text-gray-600">Read the amazing experiences and adventures of our travelers across Incredible India.</p>
        </div>

        <div className="space-y-16">
          {stories.map(story => (
            <article key={story.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#1A1F2E] mb-6">
                  {story.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-500 text-sm">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-[#E07B39]" />
                    <span className="font-medium text-gray-800">{story.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-[#E07B39]" />
                    <span>{story.date}</span>
                  </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  {story.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph.trim()}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStories;
