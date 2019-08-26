module.exports = (req, res, next) => {
    // Para evitar o CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Acess-Controll-Allow-Headers', 'Content-Type, Authorization');
    next();
}