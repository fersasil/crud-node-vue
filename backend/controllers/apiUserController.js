const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "this is my test of a secret. It can be anything";

exports.getProfileInfo = async(req, res, next) => {
    const { id } = req.user;

    try {
        const user = await User.findUserById({ id: id });
        res.status(200).json({...user });
    } catch (err) {
        err.statusCode = 400;
        throw err;
    }

}

exports.updateUserInfo = async(req, res, next) => {
    console.log("OLA mundo");
    const userData = req.body;

    try {
        const response = await User.updateUser(userData);
        res.status(200).json({ data: true });

    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
}