const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const headersMiddleWare = require('./middleware/headers');
const usersRoutes = require('./routes/users');
const loginRoute = require('./routes/auth');
const apiUserRoutes = require('./routes/apiUser');
const isAuth = require('./middleware/isAuth');
const app = express();

// Allow headers

app.use(bodyParser.json());
app.use(cors());

//Rotas

app.use(loginRoute);
app.use('/users', usersRoutes);
app.use('/api/user', isAuth, apiUserRoutes);


app.listen(3000, _ => {
    console.log('Servidor iniciado');
});