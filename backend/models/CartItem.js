const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  id: String,
  quantity: Number,
  customization: Object,
  status: {
    type: String,
    default: 'pending' // Added status to handle approval
  }
});

const CartItem = mongoose.model('CartItem', cartSchema);

module.exports = CartItem;