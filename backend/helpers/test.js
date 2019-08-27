const dbHelper = require('./dbFunctions');
const db = new dbHelper('usuario');

const a = async _ => {
    const res = await db.createNewUser('createNewUser', '123');

    console.log(res);
}

a();