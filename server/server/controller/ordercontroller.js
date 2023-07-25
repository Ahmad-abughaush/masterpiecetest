const Item = require("../models/itemmodel");
const Order = require("../models/ordermodel");
const User = require("../models/usermodel");
const errorHandler = require("../middleware/500");
const newOrder = async (req, res) => {
    try {
        const { user, products, calculatedTotal, calculatedSubtotal, shippingAddress } = req.body;

        const newOrder = new Order({
            user_id: user._id,
            products: products.map((product) => ({
                productName: product.itemName,
                quantity: product.quantity,
                price: product.price,
            })),
            subtotal: calculatedSubtotal,
            total: calculatedTotal,
            address: shippingAddress,
        });

        const order = await newOrder.save();
        res.status(201).json(order);
        console.log(order);
    } catch (e) {
        errorHandler(e, req, res);
    }
};
const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;

    try {
        const orders = await Order.find({ user_id: userId });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    getOrdersByUserId,
    newOrder,
};
