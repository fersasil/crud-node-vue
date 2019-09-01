const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "this is my test secret. It can be anything";

const getToken = user => {
    return jwt.sign({
        name: user.name,
        id: user.id
    }, JWT_SECRET, { expiresIn: '1h' });
}


exports.getAllUsers = async(req, res, next) => {
    const allUsers = await User.findAllUser();
    res.status(200).json(allUsers);
}

exports.createUser = async function(req, res, next) {
    const { name, email } = req.body;

    try {
        const created = await User.createNewUser({ name });
        res.status(200).json(created);
    } catch (err) {
        err.statusCode = 400;
        throw err;
    }
};

exports.create = async function(req, res, next) {
    const { name, password, email } = req.body;
    const EMAIL_INVALID = 'EMAIL_INVALID';
    // Verificar se o email esta cadastrado no sistema
    const isNotAvaliable = await User.emailNotAvaliabel(email);

    if (isNotAvaliable) {
        res.status(200).json({
            success: {
                code: EMAIL_INVALID,
                emailInUse: true
            }
        })

        return;
    }

    try {
        const dbResonse = await User.createUser({ name, password, email });

        //Id should be hashed?

        const token = getToken({ name, id: dbResonse.id });

        res.status(200).json({
            id: dbResonse.insertId,
            name: name,
            token: token,
            expiresIn: 3600
        });
    } catch (err) {
        err.statusCode = 400;
        throw err;
    }
};

exports.login = async function(req, res, next) {
    const { email, password } = req.body;
    let passwordCorrect = false;
    let user;


    try {
        user = await User.getUserByEmail(email);

        if (!user) {
            //Usuario não encontrado!
            res.status(401).json({ error: -1, message: 'Password or user incorrect' });
            return
        }

        passwordCorrect = await bcrypt.compare(password, user[0].password);
    } catch (err) {
        err.statusCode = 401;
        throw err;
    }

    if (!passwordCorrect) {
        res.status(401).json({ error: -1, message: 'Password or user incorrect' });
        return;
    }
    // Gera o token para login

    const token = getToken(user[0]);

    res.status(200).json({
        token: token,
        userId: user[0].id,
        name: user[0].name,
        expiresIn: 3600
    });
};

exports.deleteUser = async(req, res, next) => {
    const { id } = req.params;
    try {
        const isDeleted = await User.deleteById(id);
        res.status(200).json({ isDeleted });
    } catch (err) {
        err.statusCode = 400;
        throw err;
    }
}

exports.getUserByName = async(req, res, next) => {
    const { name } = req.params;

    try {
        const user = await User.getUserByName(name);
        res.status(200).json({ user: user[0] });

    } catch (err) {
        err.statusCode = 400;
        throw err;
    }
}

exports.updateById = async(req, res, next) => {
    const { name } = req.body;
    const { id } = req.params;

    try {
        const wasUpdated = await User.updateUserById(id, { name });
        res.status(200).json({ wasUpdated });
    } catch (err) {
        err.statusCode = 400;
        throw err;
    }
}