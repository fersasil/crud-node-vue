const express = require('express');
const usersController = require('../controllers/users');
const authController = require('../controllers/auth');
const apiUserController = require('../controllers/apiUserController');



const router = express.Router();

router.get('/profile-info', apiUserController.getProfileInfo);
router.put('/update-user-profile', apiUserController.updateUserInfo);

module.exports = router;