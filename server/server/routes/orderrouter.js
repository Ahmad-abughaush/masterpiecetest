const express = require("express");
const router = express.Router();
const userController = require('../controller/userscontroller')
const orderController = require("../controller/ordercontroller")


router.post('/neworder', orderController.newOrder )
router.get('/orders/:userId', orderController.getOrdersByUserId);
router.get('/allorders', orderController.getallOrders);
router.delete('/orders/:orderId',orderController.deleteOrderById)

// router.post('/reorder/:orderId', orderController.reorderOrder);

module.exports = router;

