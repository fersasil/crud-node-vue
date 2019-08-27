const pool = require('./dbConnect');

module.exports = class {
    constructor(table) {
        this.table = table;
    };

    selectWhere(params) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            pool.getConnection()
                .then(conn => {
                    let queryStr = `SELECT ${params.select} `;
                    queryStr += `FROM ${commonInfo.table} `;

                    if (params.where) queryStr += `WHERE ${params.where}`;

                    conn.query(queryStr)
                        .then(rows => {
                            conn.end();
                            //console.log(rows); //[ {val: 1}, meta: ... ]
                            //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
                            if (rows.length > 0) {
                                const res = [...rows]; // Tira o meta com o operador spread 
                                resolve(res);
                            } else {
                                resolve(false);
                            }
                        })
                        .catch(err => {
                            //handle error
                            conn.end();
                        })

                }).catch(err => {
                    //not connected
                });
        });
    }


    async query(query, args) {
        return new Promise(async (resolve, reject) => {
            const queryVar = args;
            const queryStr = query;
            let conn;
            try {
                conn = await pool.getConnection()
                const rows = await conn.query(queryStr, queryVar)
                conn.end();
                resolve(rows);
            }
            catch (err) {
                conn.end();
                reject(err);
                //not connected
            };
        });
    }

    async findByName(name) {
        const commonInfo = this;

        return new Promise(async function (resolve, reject) {

            try {
                const result = await this.selectWhere({ from: commonInfo.table, select: '*', where: `name = '${name}'` });
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    // async createNewUser(name, email) {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const result = await this.query("INSERT INTO " + this.table + "(`name`) VALUES (?)", [name]);
    //             resolve(result);
    //         } catch (err) {
    //             reject(err);
    //         }
    //     });
    // }

    // SELECT email FROM tabela WHERE email = 'email'
    // attribute = name  
    //SELECT attribute FROM this.table WHERE attribute = 'item'  
    // item -> g@g.com

    async isAvaliable(attribute, item) {

        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.selectWhere({from: this.table, select: attribute, where: `${attribute} = '${item}'`
                });
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });

    }

    createUser(params) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.query("INSERT INTO " + commonInfo.table + "(`name`, `password`, `email`) VALUES (?, ?, ?)", [params.name, params.password, params.email])
                .then(result => {
                    resolve(result);
                })
                .catch(err => reject(err));
        });
    }

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
}

//Usage Examples
//const u = new util('usuario');
//u.findByName('guilherme').then(res => console.log(res));
//u.selectWhere({ select: '*' }).then(res => console.log(res));
//u.createNewUser('gustavo').catch(err => console.log(err));
//u.deleteById(6);
//u.updateById(10, { name: 'João das Neves11' }).catch(err => console.log(err))
//u.deleteById(10);