const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "this is my test of a secret. It can be anything";

exports.getProfileInfo = async(req, res, next) => {
    const encodedToken = req.token;

    console.log(encodedToken);

    return;
    process.exit();

    const userInfo = jwt.verify(encodedToken, JWT_SECRET);

    console.log(userInfo);

    process.exit();

    try {
        const isAvaliable = await User.emailAvaliabel(emailDecoded);
        // if it is in use the function return true, if not, return false
        // return true if it can be used and false if it cant 
        res.status(200).json({ isAvaliable: !isAvaliable });
    } catch (err) {
        err.statusCode = 400;
        throw err;
    }

}