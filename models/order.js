const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  qty: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  items: [ OrderItemSchema ],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },
  customer: {
    name: String,
    email: String,
    phone: String,
    address: String
  },
  paymentMethod: { type: String, default: 'COD' }, // Cash on Delivery for now
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'pending' } // pending / confirmed / delivered etc
});

module.exports = mongoose.model('Order', OrderSchema);
