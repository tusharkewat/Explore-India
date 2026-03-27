const fs = require('fs');
const path = require('path');

const spiritualNames = ["Varanasi", "Amritsar", "Tirupati", "Puri", "Vrindavan", "Mathura", "Bodh Gaya", "Shirdi", "Haridwar", "Rishikesh"];
const hillStationNames = ["Manali", "Shimla", "Darjeeling", "Coorg", "Mussoorie", "Ooty", "Munnar", "Nainital", "Kodaikanal", "Dalhousie"];
const beachNames = ["Goa", "Andaman Islands", "Varkala", "Kovalam", "Tarkarli", "Radhanagar Beach", "Puri Beach", "Diu", "Alibag", "Mahabalipuram"];
const wildlifeNames = ["Jim Corbett", "Ranthambore", "Kaziranga", "Sundarbans", "Bandhavgarh", "Gir Forest", "Periyar", "Nagarhole", "Kanha", "Tadoba"];
const culturalNames = ["Jaipur", "Agra", "Hampi", "Khajuraho", "Mysore", "Udaipur", "Jodhpur", "Ahmedabad", "Ellora Caves", "Konark Sun Temple"];

const generateData = (names, category, startIdx) => {
  return names.map((name, i) => {
    const defaultState = category === 'Spiritual' ? 'Uttar Pradesh' : category === 'Hill Stations' ? 'Himachal Pradesh' : category === 'Beaches' ? 'Goa' : category === 'Wildlife' ? 'Madhya Pradesh' : 'Rajasthan';
    const images = [
      "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800&q=80",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
      "https://images.unsplash.com/photo-1600100397608-f010f41cb965?w=800&q=80"
    ];
    return {
      slug: name.toLowerCase().replace(/ /g, '-'),
      name: name,
      state: defaultState,
      region: "India",
      category: category.toLowerCase(),
      price: 4999 + (i * 1000),
      rating: (4.0 + (i % 10) * 0.1).toFixed(1),
      reviewCount: 150 + (i * 45),
      image: images[i % 5],
      tags: [category.toLowerCase(), "popular", "explore"],
      description: `Experience the amazing attractions and beautiful scenery of ${name}. A perfect destination for ${category.toLowerCase()} lovers.`,
      bestTime: "October to March",
      attractions: ["Main Center", "Scenic Viewpoint", "Local Market", "Historic Monument"],
      howToReach: { air: "Nearest Airport", rail: "Main Junction", road: "Well connected by road" },
      itinerary: [
        { day: 1, title: `Arrival in ${name}`, description: `Arrive and settle in at your hotel in ${name}.` },
        { day: 2, title: "Sightseeing", description: "Visit the major attractions." },
        { day: 3, title: "Exploration", description: "Explore the local culture and cuisine." },
        { day: 4, title: "Departure", description: "Pack your bags and cherish the memories." }
      ]
    };
  });
};

const allDestinations = [
  ...generateData(spiritualNames, "Spiritual"),
  ...generateData(hillStationNames, "Hill Stations"),
  ...generateData(beachNames, "Beaches"),
  ...generateData(wildlifeNames, "Wildlife"),
  ...generateData(culturalNames, "Cultural")
];

const fileContent = `export const destinations = ${JSON.stringify(allDestinations, null, 2)};`;

const targetDir = path.join(__dirname, 'client', 'src', 'data');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

fs.writeFileSync(path.join(targetDir, 'destinations.js'), fileContent);
console.log('Created destinations.js with 50 entries.');
