const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({

    user_id: {
        type: String,
    }
    ,
    products: [
        {
            productName: { type: String, },
            Price: { type: Number },
            Quantity: { type: Number }
        }
    ],

    address: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;