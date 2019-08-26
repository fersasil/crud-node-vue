const express = require('express');
const bodyParser = require('body-parser');
const headersMiddleWare = require('./middleware/headers');
const usersRoutes = require('./routes/users');
const loginRoute = require('./routes/auth');
const cors = require('cors');

const app = express();

// Allow headers

app.use(bodyParser.json());
app.use(cors());

//Rotas

app.use(loginRoute);
app.use('/users', usersRoutes);



app.listen(3000, _ => {
    console.log('Servidor iniciado');
});