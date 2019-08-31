const jwt = require('jsonwebtoken');
const JWT_SECRET = "this is my test secret. It can be anything";

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
        res.status(401).json(error);
        return;
        //throw error;
    }

    //Colocar as informações do usuario no request
    const user = {
        id: decodedToken.id
    };

    req.user = user;

    next();
}