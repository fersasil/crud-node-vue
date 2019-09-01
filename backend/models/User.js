const bcrypt = require('bcrypt');

const dbHelper = require('../helpers/dbFunctions');
const dbFunc = new dbHelper('usuario');

module.exports = class {
    constructor(params) {
        this.name = params.name;
        this.password = params.password;
        this.email = params.email;
        this.id = params.id;
    }

    static async emailNotAvaliabel(email) {
        return dbFunc.isInUse({
            attribute: 'email',
            myItem: email
        });
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

    static async getUserByEmail(email) {
        const res = await dbFunc.findByEmail(email);
        if (res === false) {
            return false;
        }

        res.email = email;

        return res;

    }

    static async updateUserById(id, params) {
        return dbFunc.updateById(id, params);
    }

    static async findUserById(params) {
        const select = 'name, email';
        return dbFunc.findById({ id: params.id, select });
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

    static async updateUser(userData) {
        return dbFunc.updateById(userData);
    }

};