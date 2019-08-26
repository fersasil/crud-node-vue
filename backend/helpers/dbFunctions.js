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


    // selectWhere(params) {
    //     //Retorna uma promise
    //     const commonInfo = this;

    //     return new Promise(function (resolve, reject) {
    //         // Define as variaveis para poderem ser utilizadas no futuro
    //         //const queryVar = [args];
    //         let queryStr = `SELECT ${params.select} `;
    //         queryStr += `FROM ${commonInfo.table} `;

    //         if (params.where) queryStr += `WHERE ${params.where}`;


    //         pool.getConnection()
    //             .then(conn => { //Retorna a conexão
    //                 return conn.query(queryStr);
    //             }).then((rows) => { // Retorna o resultado
    //                 console.log('oi')
    //                 conn.end();
    //                 process.exit();
    //                 const res = rows;
    //                 console.log(res);
    //                 if (rows.length > 0) {
    //                     const res = [...rows]; // Tira o meta com o operador spread 
    //                     resolve(res);
    //                 } else {
    //                     resolve(false);
    //                 }
    //                 conn.end();

    //             })
    //             .catch(err => {
    //                 // conn.end();
    //                 console.log(err)
    //                 resolve(err)
    //             }); // Handle errors
    //     });
    // }

    query(query, args) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            const queryVar = args;
            const queryStr = query;

            pool.getConnection()
                .then(conn => {

                    conn.query(queryStr, queryVar)
                        .then((rows) => {
                            conn.end();
                            resolve(rows);
                            console.log(rows); //[ {val: 1}, meta: ... ]
                            //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
                        })
                        .catch(err => {
                            //handle error
                            reject(err)
                            conn.end();
                        })

                }).catch(err => {
                    reject(err);
                    //not connected
                });
        });
    }

    findByName(name) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.selectWhere({ from: commonInfo.table, select: '*', where: `name = '${name}'` })
                .then(result => resolve(result))
                .catch(err => reject(err));
        });
    }

    createNewUser(name, email) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.query("INSERT INTO " + commonInfo.table + "(`name`) VALUES (?)", [name])
                .then(result => {
                    resolve(true);
                })
                .catch(err => reject(err));
        });
    }

    createUser(params) {
        const commonInfo = this;

        return new Promise((resolve, reject) => {
            this.query("INSERT INTO " + commonInfo.table + "(`name`, `password`) VALUES (?, ?)", [params.name, params.password])
                .then(result => {
                    resolve(true);
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