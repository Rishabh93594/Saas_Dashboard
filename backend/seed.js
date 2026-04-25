const mongoose = require('mongoose');
const Order = require('./models/Order');
require('dotenv').config();

const seedOrders = [
  {
    orderId: '#ORD-28492',
    client: 'Urban Nexus Inc.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    status: 'Completed',
    date: 'Oct 24, 2024',
    amount: '$12,400.00'
  },
  {
    orderId: '#ORD-28493',
    client: 'Global Logistics Ltd.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    status: 'Processing',
    date: 'Oct 25, 2024',
    amount: '$8,250.00'
  },
  {
    orderId: '#ORD-28494',
    client: 'EcoSystems Agency',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    status: 'Hold',
    date: 'Oct 26, 2024',
    amount: '$3,120.00'
  },
  {
    orderId: '#ORD-28495',
    client: 'Stellar Venture Group',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop',
    status: 'Completed',
    date: 'Oct 27, 2024',
    amount: '$22,000.00'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected for seeding...');
    
    await Order.deleteMany({});
    console.log('🗑️  Old orders cleared.');
    
    await Order.insertMany(seedOrders);
    console.log('📦 Seed data inserted successfully!');
    
    process.exit();
  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
