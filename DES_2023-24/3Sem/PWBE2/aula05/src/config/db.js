const mysql2 = require("mysql2/promise");


// module.exports = {
//     connection: function () {
//         return mysql2.createConnection({
//             host     : 'localhost',
//             port     : 3306,
//             user     : 'root',
//             password : '1234',
//             database : 'db_clientes_api'
//         });
//     }, 

//     executeSQLQueryParams: async function (sql, params) {
//         const conn = this.connection();
//         try {
//             await conn.beginTransaction();
//             const result = await new Promise((resolve, reject) => {
//                 conn.query(sql, params, (error, results, fields) => {
//                     if (error) {
//                         reject(error);
//                     } else {
//                         resolve({ results, fields });
//                     }
//                 });
//             });
//             await conn.commit();
//             return result;
//         } catch (error) {
//             await conn.rollback();
//             throw error;
//         } finally {
//             conn.end();
//         }
//     },    

//     executeSQLQuery: async function (sql) {
//         const conn = this.connection();
//         return new Promise((resolve, reject) => {
//             conn.query(sql, (error, results, fields) => {
//                 if (error) {
//                     reject(error);
//                 } else {
//                     resolve({ results, fields });
//                 }
//                 conn.end();
//             });
//         });
//     }
// }



async function conectarBancoDeDados() {
 
    // if (global.connection && global.connection.state !== 'disconnected') {
    //     console.log(global.connection._events);
    //     return global.connection;
    // }
    
    const connection = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes_api',
        user: 'root',
        password: '1234',
        multipleStatements:true //permitir a execução de várias queries ao mesmo tempo
    });

    // console.log(connection._events);
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = conectarBancoDeDados;











// const mysql2 = require("mysql2/promise");

// let pool = null;

// async function criarPoolDeConexoes() {
//     if (!pool) {
//         pool = await mysql2.createPool({
//             host: 'localhost',
//             port: '3306',
//             database: 'db_clientes_api',
//             user: 'root',
//             password: '1234',
//             waitForConnections: true, // Aguarda conexões se não houver disponíveis no momento
//             connectionLimit: 10, // Limite máximo de conexões no pool
//             multipleStatements: true // Permitir a execução de várias queries ao mesmo tempo
//         });
//         console.log("Pool de conexões criado.");
//     }
//     return pool;
// }

// async function obterConexaoDoPool() {
//     const pool = await criarPoolDeConexoes();
//     return pool.getConnection();
// }

// module.exports = obterConexaoDoPool;
