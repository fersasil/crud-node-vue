const express = require('express');
const usersController = require('../controllers/users');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/getAll', isAuth, usersController.getAllUsers);
router.get('/u', usersController.getAllUsers);

router.post('/createUser', usersController.createUser);
router.delete('/delete/:id', usersController.deleteUser);
router.get('/byName/:name', usersController.getUserByName);
router.put('/update/:id', usersController.updateById);

module.exports = router;