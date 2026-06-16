const mongoose = require('mongoose');
require('dotenv').config();
const Match = require('./models/Match');

const matchesData = [
  {
    matchId: '#MAT-10064',
    teams: 'Argentina vs France',
    avatar: '/images/argentina_flag.png',
    status: 'Completed',
    date: 'Dec 18, 2022',
    score: '3 - 3 (4-2 Pen)'
  },
  {
    matchId: '#MAT-10063',
    teams: 'Croatia vs Morocco',
    avatar: '/images/morocco_flag.png',
    status: 'Completed',
    date: 'Dec 17, 2022',
    score: '2 - 1'
  },
  {
    matchId: '#MAT-10062',
    teams: 'France vs Morocco',
    avatar: '/images/france_flag.png',
    status: 'Completed',
    date: 'Dec 14, 2022',
    score: '2 - 0'
  },
  {
    matchId: '#MAT-10061',
    teams: 'Argentina vs Croatia',
    avatar: '/images/argentina_flag.png',
    status: 'Completed',
    date: 'Dec 13, 2022',
    score: '3 - 0'
  },
  {
    matchId: '#MAT-10060',
    teams: 'England vs France',
    avatar: '/images/france_flag.png',
    status: 'Completed',
    date: 'Dec 10, 2022',
    score: '1 - 2'
  },
  {
    matchId: '#MAT-10059',
    teams: 'Morocco vs Portugal',
    avatar: '/images/morocco_flag.png',
    status: 'Completed',
    date: 'Dec 10, 2022',
    score: '1 - 0'
  },
  {
    matchId: '#MAT-10058',
    teams: 'Brazil vs Croatia',
    avatar: '/images/france_flag.png',
    status: 'Completed',
    date: 'Dec 09, 2022',
    score: '1 - 1 (2-4 Pen)'
  },
  {
    matchId: '#MAT-10057',
    teams: 'Netherlands vs Argentina',
    avatar: '/images/argentina_flag.png',
    status: 'Completed',
    date: 'Dec 09, 2022',
    score: '2 - 2 (3-4 Pen)'
  },
  {
    matchId: '#MAT-20001',
    teams: 'Argentina vs Brazil',
    avatar: '/images/argentina_flag.png',
    status: 'Live',
    date: 'Live Now',
    score: '2 - 1 (75\')'
  },
  {
    matchId: '#MAT-20002',
    teams: 'Spain vs Germany',
    avatar: '/images/fifa_logo.png',
    status: 'Scheduled',
    date: 'Jun 28, 2026',
    score: 'vs'
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');
    
    // Clear existing matches
    await Match.deleteMany({});
    console.log('🧹 Cleared existing matches');
    
    // Insert seed data
    const inserted = await Match.insertMany(matchesData);
    console.log(`🎉 Seeded ${inserted.length} matches successfully!`);
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
