const mongoose = require('mongoose');

function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const dd = String(today.getDate()).padStart(2, '0');
  return `${dd}-${mm}-${yyyy}`;
}


const orderSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  items: [
    {
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: getTodayDate()
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending'
  }
});

const OrderModel = mongoose.model('orders', orderSchema);
module.exports = OrderModel