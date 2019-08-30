const express = require('express');
const usersController = require('../controllers/users');
const authController = require('../controllers/auth');

const router = express.Router();


router.post('/login', usersController.login);
router.post('/create', usersController.create);
router.get('/find-email-avaliable/:email', authController.verifyIfEmailIsValid);

module.exports = router;