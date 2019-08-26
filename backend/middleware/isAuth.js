const jwt = require('jsonwebtoken');
const JWT_SECRET = "this is my test of a secret. It can be anything";

module.exports = (req, res, next) => {
    //Formato do token!
    // No header vai ter
    // Authorization: Bearer TOKEN
    const authorization = req.get('Authorization');

    const token = authorization ? authorization.split(' ')[1] : false;
    let decodedToken;

    if (token) {

        try {
            decodedToken = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
    } else {
        decodedToken = false;
    }

    if (!decodedToken) {
        const error = { message: 'Not Authenticated' };
        // error.statusCode = 401;
        res.status(401).json(error);
        return;
        //throw error;
    }

    //Colocar as informações do usuario no request
    const user = {
        id: decodedToken.userId
    };

    req.user = user;
    next();
}