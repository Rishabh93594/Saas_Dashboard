export interface Stadium {
  id: string;
  name: string;
  capacity: number;
  city: string;
  location: string;
  openedYear: number;
  matchesHosted: number;
  finalVenue: boolean;
  surface: string;
  architect: string;
  description: string;
  gradient: string;
  icon: string;
  image: string;
}

export const STADIUMS: Stadium[] = [
  {
    id: 'lusail',
    name: 'Lusail Stadium',
    capacity: 89000,
    city: 'Lusail',
    location: 'Lusail, Qatar',
    openedYear: 2021,
    matchesHosted: 10,
    finalVenue: true,
    surface: 'Natural Grass',
    architect: 'Foster + Partners',
    description: 'Iconic golden bowl-shaped venue hosting the FIFA World Cup Final. Inspired by the fanar lanterns of the Arab world.',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    icon: '🏆',
    image: '/images/stadiums/lusail.png',
  },
  {
    id: 'stadium974',
    name: 'Stadium 974',
    capacity: 44089,
    city: 'Doha',
    location: 'Ras Abu Aboud, Doha',
    openedYear: 2021,
    matchesHosted: 7,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Fenwick Iribarren Architects',
    description: 'Unique fully demountable stadium built from 974 repurposed shipping containers — 974 being Qatar\'s international dialling code.',
    gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
    icon: '📦',
    image: '/images/stadiums/stadium974.png',
  },
  {
    id: 'khalifa',
    name: 'Khalifa International Stadium',
    capacity: 45857,
    city: 'Doha',
    location: 'Al Rayyan, Doha',
    openedYear: 1976,
    matchesHosted: 8,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Dar Al-Handasah',
    description: 'Qatar\'s oldest and most iconic stadium, fully renovated for 2022. Home to the opening ceremony and major fixtures.',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    icon: '🌙',
    image: '/images/stadiums/khalifa.png',
  },
  {
    id: 'albayat',
    name: 'Al Bayt Stadium',
    capacity: 60000,
    city: 'Al Khor',
    location: 'Al Khor, Qatar',
    openedYear: 2021,
    matchesHosted: 8,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Pattern Design',
    description: 'Inspired by the bayt al sha\'ar, the tents historically used by nomadic peoples in Qatar and the broader region.',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    icon: '⛺',
    image: '/images/stadiums/albayat.png',
  },
  {
    id: 'aljanoub',
    name: 'Al Janoub Stadium',
    capacity: 44325,
    city: 'Al Wakrah',
    location: 'Al Wakrah, Qatar',
    openedYear: 2019,
    matchesHosted: 7,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Zaha Hadid Architects',
    description: 'Designed by Zaha Hadid, the stadium\'s form references the dhow boats traditionally used by pearl divers in the region.',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    icon: '⛵',
    image: '/images/stadiums/aljanoub.png',
  },
  {
    id: 'ahmadbin',
    name: 'Ahmad Bin Ali Stadium',
    capacity: 44740,
    city: 'Al Rayyan',
    location: 'Al Rayyan, Qatar',
    openedYear: 2020,
    matchesHosted: 7,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Pattern Design',
    description: 'Celebrates the unique landscape and culture of Al Rayyan — the falcon, desert, and geometric patterns of the nation.',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    icon: '🦅',
    image: '/images/stadiums/ahmadbin.png',
  },
  {
    id: 'educationcity',
    name: 'Education City Stadium',
    capacity: 45350,
    city: 'Al Rayyan',
    location: 'Education City, Al Rayyan',
    openedYear: 2020,
    matchesHosted: 8,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Fenwick Iribarren Architects',
    description: 'A diamond-shaped masterpiece in Qatar\'s Knowledge City. The geometric facade creates a breathtaking kaleidoscope effect.',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    icon: '💎',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'alwakrah',
    name: 'Al Thumama Stadium',
    capacity: 44400,
    city: 'Doha',
    location: 'Al Thumama, Doha',
    openedYear: 2021,
    matchesHosted: 8,
    finalVenue: false,
    surface: 'Natural Grass',
    architect: 'Ibrahim M. Jaidah',
    description: 'Inspired by the gahfiya, a traditional woven cap worn by men across the Arab world and Africa.',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    icon: '🎩',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?w=600&auto=format&fit=crop&q=80',
  },
];

export const STADIUM_STATS = {
  totalCapacity: STADIUMS.reduce((sum, s) => sum + s.capacity, 0),
  totalMatches: STADIUMS.reduce((sum, s) => sum + s.matchesHosted, 0),
  averageCapacity: Math.round(STADIUMS.reduce((sum, s) => sum + s.capacity, 0) / STADIUMS.length),
  venueCities: [...new Set(STADIUMS.map(s => s.city))].length,
};
