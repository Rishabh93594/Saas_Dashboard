const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  client: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  status: {
    type: String,
    enum: ['Completed', 'Processing', 'Hold'],
    default: 'Processing'
  },
  date: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
