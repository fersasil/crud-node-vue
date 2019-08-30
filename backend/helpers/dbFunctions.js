const pool = require('./dbConnect');

//TODO prevent mysql injection

const errorHandler = err => {
    err.statusCode = 400;
    throw err;
}

module.exports = class {
    constructor(table) {
        this.table = table;
    };

    async selectWhere(params) {
        return new Promise(async(resolve, reject) => {
            let conn;
            try {
                conn = await pool.getConnection();
                let queryStr = `SELECT ${params.select} `;
                queryStr += `FROM ${this.table} `;

                if (params.where) queryStr += `WHERE ${params.where}`;

                const rows = await conn.query(queryStr);
                conn.end();

                // separa os dados 

                if (rows.length > 0) {
                    const dataInRows = [...rows];
                    // dataInRows.foundSomething = true;
                    resolve(dataInRows);
                } else resolve(false);

            } catch (err) {
                conn.end();

                if (reject) reject(err)
                errorHandler(err);
            }
        });
    }

    async query(query, args) {
        return new Promise(async(resolve, reject) => {
            const queryVar = args;
            const queryStr = query;
            let conn;

            try {
                conn = await pool.getConnection();
                const rows = await conn.query(queryStr, queryVar);
                conn.end();
                resolve(rows);
            } catch (err) {
                conn.end();
                if (reject) reject(err);
                errorHandler(err);
            }
        });
    }

    //TODO: maybe refactor this to async await
    findByName(name) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.selectWhere({ from: commonInfo.table, select: '*', where: `name = '${name}'` })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    //TODO: Find by name and find by email could be one funcion!
    findByEmail(email) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.selectWhere({ from: commonInfo.table, select: 'name, id, password', where: `email = '${email}'` })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    //TODO: maybe refactor this to async await
    createNewUser(name, email) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.query("INSERT INTO " + commonInfo.table + "(`name`) VALUES (?)", [name])
                .then(result => resolve(true))
                .catch(err => reject(err));
        });
    }

    //TODO: maybe refactor this to async await
    createUser(params) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.query("INSERT INTO " + commonInfo.table + "(`name`, `password`, `email`) VALUES (?, ?, ?)", [params.name, params.password, params.email])
                .then(result => {
                    resolve(true);
                })
                .catch(err => reject(err));
        });
    }

    //TODO: maybe refactor this to async await
    deleteById(id) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.query(`DELETE FROM ${commonInfo.table} WHERE id = ${id}`)
                .then(res => {
                    resolve(true);
                })
                .catch(err => reject(err));
        });
    }

    //TODO: maybe refactor this to async await
    updateById(id, params) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            //UPDATE `test`.`usuario` SET `name` = 'loca' WHERE (`id` = '6');
            let queryString = `UPDATE ${commonInfo.table} `;
            queryString += "SET name = '" + params.name + "' ";
            queryString += `WHERE id = '${id}'`

            this.query(queryString)
                .then(res => {
                    resolve(true);
                })
                .catch(err => reject(err));
        });
    }

    /**
     * @param {*} params attribute: name of the attribute, same as db - 
     * @param {*} params myItem: item that you want to search
     * return true if it is in use, and false if not
     */
    async isInUse(params) {
        return new Promise(async(resolve, reject) => {
            let conn;

            try {
                const response = await this.selectWhere({
                    select: params.attribute,
                    where: `${params.attribute} = '${params.myItem}'`
                });

                resolve(response.foundSomething);

            } catch (err) {
                if (reject) reject(err);
                errorHandler();
            }
        });
    }
}

//Usage Examples
//const u = new util('usuario');
//u.findByName('guilherme').then(res => console.log(res));
//u.selectWhere({ select: '*' }).then(res => console.log(res));
//u.createNewUser('gustavo').catch(err => console.log(err));
//u.deleteById(6);
//u.updateById(10, { name: 'João das Neves11' }).catch(err => console.log(err))
//u.deleteById(10);