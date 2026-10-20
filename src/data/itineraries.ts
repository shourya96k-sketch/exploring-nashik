import { Itinerary } from '../types/blog';

export const ITINERARIES: Itinerary[] = [
  {
    id: '1-day-heritage-express',
    title: '1-Day Heritage & Sacred Nashik',
    subtitle: 'From morning Godavari aartis to afternoon Peshwa architecture and sunset by the vineyards.',
    duration: '1 Full Day',
    idealFor: 'First-time visitors & weekend day-trippers from Mumbai/Pune',
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Old Nashik, Panchavati & Sula Sunset',
        description: 'Immerse in ancient epic history along the Godavari before unwinding in wine country.',
        spots: [
          {
            time: '07:30 AM',
            spotTitle: 'Panchavati & Ramkund Ghats',
            articleId: 'panchavati-ramkund',
            activity: 'Attend morning prayer by the Godavari, visit Sita Gufa and the 5 ancient Banyan trees.',
            tip: 'Savor hot Sabudana Wada at nearby Sayantara stall.'
          },
          {
            time: '09:45 AM',
            spotTitle: 'Shree Kalaram Mandir',
            articleId: 'shree-kalaram-mandir',
            activity: 'Admire the 2,000 black-stone architecture and 84 carved pillars in peace.',
            tip: 'Grab traditional golden jalebis from Budha Halwai (Nashik\'s oldest sweet shop).'
          },
          {
            time: '12:30 PM',
            spotTitle: 'Trimbakeshwar Jyotirlinga Temple',
            articleId: 'trimbakeshwar-jyotirlinga',
            activity: 'Take darshan of the rare three-faced Swayambhu Jyotirlinga and explore Kushavarta Kund.',
            tip: 'Book quick-darshan pass online or early at counter to save queue time.'
          },
          {
            time: '04:30 PM',
            spotTitle: 'Sula Vineyards & Tasting Room',
            articleId: 'sula-vineyards',
            activity: 'Take the afternoon cellar tour, taste 6 premium wines, and enjoy sunset at the amphitheater.',
            tip: 'Book wood-fired dinner pizza at Little Italy overlooking the vines.'
          }
        ]
      }
    ]
  },
  {
    id: '2-day-wine-and-treks',
    title: '2-Day Wine Country & Sahyadri Vistas',
    subtitle: 'The quintessential blend of Deccan viticulture, waterfall picnics, and ancient rock-cut caves.',
    duration: '2 Days / 1 Night',
    idealFor: 'Couples, friends & nature enthusiasts',
    days: [
      {
        dayNumber: 1,
        dayTitle: 'Ancient Caves & The Wine Trail',
        description: 'Ascend Trirashmi hill before exploring boutique wineries along Gangapur Dam.',
        spots: [
          {
            time: '08:00 AM',
            spotTitle: 'Pandavleni Buddhist Caves',
            articleId: 'pandavleni-caves',
            activity: 'Climb 300 steps up Trirashmi Hill and explore 2,000-year-old rock-cut stupas and viharas.',
            tip: 'Best lighting for photos inside Cave 3 and Cave 18 happens before 10 AM.'
          },
          {
            time: '11:00 AM',
            spotTitle: 'Someshwar Waterfalls (Dudhsagar)',
            articleId: 'someshwar-waterfall',
            activity: 'Walk along the foaming Godavari rapids and enjoy fresh roasted coal-fired bhutta.',
            tip: 'Visit Someshwar Mahadev temple tucked behind the river bend.'
          },
          {
            time: '02:00 PM',
            spotTitle: 'Sula Vineyards',
            articleId: 'sula-vineyards',
            activity: 'Tour the oak barrel cellar and take a wine tasting masterclass.',
            tip: 'Try their award-winning Dindori Reserve Shiraz.'
          },
          {
            time: '05:30 PM',
            spotTitle: 'York Winery & Tasting Room',
            articleId: 'york-winery',
            activity: 'Sunset wine flight on the open-air deck directly overlooking Gangapur Dam waters.',
            tip: 'Pair the sunset with York\'s artisanal Indian kebab tapas.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: 'Mythological Peaks & Heritage Old City',
        description: 'Breathe crisp mountain air atop Anjaneri before exploring sacred Panchavati.',
        spots: [
          {
            time: '06:30 AM',
            spotTitle: 'Anjaneri Hills & Fort Trek',
            articleId: 'anjaneri-hills-fort',
            activity: 'Climb to the birthplace of Lord Hanuman; experience reverse mist updrafts.',
            tip: 'Wear shoes with good grip and carry light snacks.'
          },
          {
            time: '12:00 PM',
            spotTitle: 'Famous Nashik Misal Feast',
            activity: 'Feast on authentic spicy Maharashtrian Misal Pav with farsan, tarri, and chilled curd.',
            tip: 'Try Hotel Shamsundar (Satpur) or Sadhana Chulivarchi Misal.'
          },
          {
            time: '03:00 PM',
            spotTitle: 'Panchavati, Ramkund & Kalaram Mandir',
            articleId: 'panchavati-ramkund',
            activity: 'Wander the river ghats, Sita Gufa, and the black stone temple of Kalaram.',
            tip: 'Shop for fresh raisins and local goda masala in the old bazaar.'
          }
        ]
      }
    ]
  },
  {
    id: '3-day-ultimate-explorer',
    title: '3-Day The Grand Nashik Expedition',
    subtitle: 'From the heart-pumping vertical stairs of Harihar Fort to sacred Saptashrungi cliff shrine.',
    duration: '3 Days / 2 Nights',
    idealFor: 'Adventure trekkers, road trippers & comprehensive cultural travelers',
    days: [
      {
        dayNumber: 1,
        dayTitle: 'The Jyotirlinga & Adrenaline Peak',
        description: 'Trek Harihar Fort in the morning and seek blessings at Trimbakeshwar in the afternoon.',
        spots: [
          {
            time: '06:30 AM',
            spotTitle: 'Harihar Fort Trek',
            articleId: 'harihar-fort-trek',
            activity: 'Conquer the thrilling 80-degree stone-notched stairs up to 3,676 feet.',
            tip: 'Start super early to avoid heat and descent traffic on the stairs.'
          },
          {
            time: '02:00 PM',
            spotTitle: 'Trimbakeshwar Shiva Temple',
            articleId: 'trimbakeshwar-jyotirlinga',
            activity: 'Darshan of the three-faced Jyotirlinga and peaceful walk around Kushavarta Kund.',
            tip: 'Dress modestly in traditional Indian clothing.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: 'The Sacred Seven Summits of Vani',
        description: 'A picturesque road trip north to the cliff-carved Shaktipeetha of Saptashrungi.',
        spots: [
          {
            time: '08:30 AM',
            spotTitle: 'Scenic Drive to Vani & Saptashrungi Gad',
            activity: 'Drive 60 km through vineyards, onion farms, and craggy Sahyadri ghats.',
            tip: 'Stop at roadside dhabas for hot jowar bhakri and thecha.'
          },
          {
            time: '10:30 AM',
            spotTitle: 'Saptashrungi Devi Gad',
            articleId: 'saptashrungi-devi-gad',
            activity: 'Ride the funicular trolley or climb 510 steps to the 10-foot rock-hewn Goddess.',
            tip: 'Taste the sanctified pedhas at the temple bazaar.'
          },
          {
            time: '04:30 PM',
            spotTitle: 'York Winery & Gangapur Dam',
            articleId: 'york-winery',
            activity: 'Golden hour wine tasting relaxing beside the lake.',
            tip: 'Try their signature sparkling brut paired with local paneer tikka.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: 'Living Heritage & Ancient Stupas',
        description: 'Immerse in 2,000 years of civilization across Pandavleni and Panchavati.',
        spots: [
          {
            time: '08:00 AM',
            spotTitle: 'Pandavleni Buddhist Caves',
            articleId: 'pandavleni-caves',
            activity: 'Explore ancient Brahmi inscriptions and monolithic prayer stupas.',
            tip: 'Take panoramic photos of Nashik city from the cave terrace.'
          },
          {
            time: '11:00 AM',
            spotTitle: 'Someshwar Waterfalls',
            articleId: 'someshwar-waterfall',
            activity: 'Relax by the milky Godavari cascades and visit the peaceful Shiva temple.',
            tip: 'Enjoy fresh sugarcane juice from the riverside stalls.'
          },
          {
            time: '02:30 PM',
            spotTitle: 'Panchavati, Kalaram Mandir & Godavari Ghats',
            articleId: 'panchavati-ramkund',
            activity: 'Visit the black stone Kalaram Mandir, Sita Gufa, and watch the sunset Godavari Aarti.',
            tip: 'End your trip with a box of fresh Sayantara pedhas and Nashik grapes.'
          }
        ]
      }
    ]
  }
];
