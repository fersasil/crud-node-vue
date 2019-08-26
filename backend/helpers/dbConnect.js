const mariadb = require('mariadb');

module.exports = mariadb.createPool({
    connectionLimit: 15,
    host: 'localhost',
    user: 'gui',
    password: '',
    database: 'test',
});