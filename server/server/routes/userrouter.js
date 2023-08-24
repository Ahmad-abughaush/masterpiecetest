const express = require("express");
const router = express.Router();
const userController = require('../controller/userscontroller');


router.post('/signup', userController.signup);
router.post('/login', userController.login)
router.get('/users/:id',userController.oneUser)
router.put('/users/:id', userController.updateUser);


router.get('/users/email/:email', userController.getUserByEmail); 





// dahsboard
router.get('/allproviders', userController.getallproviders);
router.patch('/allproviders/:id/accept', userController.acceptprovider);
router.delete('/allproviders/:id', userController.deleteProvider);
// dahsboard


module.exports = router;


