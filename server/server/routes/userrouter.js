const express = require("express");
const router = express.Router();
const userController = require('../controller/userscontroller');


router.post('/signup', userController.signup);
router.post('/login', userController.login)
router.get('/users/:id',userController.oneUser)
router.put('/users/:id', userController.updateUser);

module.exports = router;


