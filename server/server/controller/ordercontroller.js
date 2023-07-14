const Item = require("../models/itemmodel");
const Order = require("../models/ordermodel");
const errorHandler = require("../middleware/500");

const newOrder = async (req, res) => {
    try {
        const { user, products, calculatedTotal, calculatedSubtotal, shippingAddress } = req.body;

        const newIOrder = new Order({
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

const allorders = async (req, res) => {
    try {
        const orders = await Order.find(req.query);
        const result = await Promise.all(
            orders.map(async (order) => {
                const order = await Order.findById(user.user_id);
                return {
                    user,
                    order,
                };
            })
        );
        return res.json(result);
    } catch (e) {
        return errorHandler(e, req, res);
    }
};

module.exports = {
    allorders,
    newOrder,
};
