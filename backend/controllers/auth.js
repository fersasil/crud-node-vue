const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "this is my test of a secret. It can be anything";

exports.verifyIfEmailIsValid = async(req, res, next) => {
    const emailEncoded = req.params.email;
    const emailDecoded = decodeURIComponent(emailEncoded);
    // Decode url


    // console.log(email);

    //TODO: Validate email with regex
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