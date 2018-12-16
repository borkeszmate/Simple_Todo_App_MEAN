const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const authGuard = require('../middlewares/auth-middleware');



router.get('/register', userController.getUsers);


router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/isAuthenticated', authGuard);

module.exports = router;