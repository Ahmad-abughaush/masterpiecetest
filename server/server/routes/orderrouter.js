const express = require("express");
const router = express.Router();
const userController = require('../controller/userscontroller')
const orderController = require("../controller/ordercontroller")


router.post('/neworder', orderController.newOrder )
// router.get("/allorders", orderController.allorders)


module.exports = router;

