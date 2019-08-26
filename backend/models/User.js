const bcrypt = require('bcrypt');

const dbHelper = require('../helpers/dbFunctions');
const dbFunc = new dbHelper('usuario');

module.exports = class {
    constructor(name, email, password) {
        this.name = name;
        this.password = password;
        this.email = email;
    }

    static async findAllUser() {
        const users = await dbFunc.selectWhere({ select: '*' });
        return users;
    }

    static async createNewUser(params) {
        return dbFunc.createNewUser(params.name);
    }

    static async deleteById(id) {
        return dbFunc.deleteById(id);
    }

    static async getUserByName(name) {
        return dbFunc.findByName(name);
    }

    static async updateUserById(id, params) {
        return dbFunc.updateById(id, params);
    }

    static async createUser(params) {
        const password = await bcrypt.hash(params.password, 12);
        params.password = password;
        return dbFunc.createUser(params);
    }

    static async login(params) {
        const password = bcrypt.hash(params.password);

        return dbFunc.createNewUser(params.name, params.password);
    }
};