const mysql2 = require("mysql2/promise");

// BANCO DE DADOS
// const connection = async () => {

//     if (global.connection && global.connection.state !== 'disconnected') {
//         return global.connection;
//     }
//     const con = await mysql2.createConnection({
//         host: 'localhost',
//         port: '3306',
//         database: 'db_clientes',
//         user: 'root',
//         password: '1234'
//     });
//     console.log("Conectou no MySQL!");
//     global.connection = con;
//     return con;
// }


async function conectarBancoDeDados() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const connection = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes',
        user: 'root',
        password: '1234',
        multipleStatements:true //permitir a execução de várias queries ao mesmo tempo
    });
    console.log("Conectou no MySQL!");
    global.connection = connection;
    return connection;
}

module.exports = conectarBancoDeDados;
