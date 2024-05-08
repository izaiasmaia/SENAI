const mysql2 = require("mysql2/promise");

// BANCO DE DADOS
const connection = async () => {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const con = await mysql2.createConnection({
        host: '192.168.4.111',
        port: '3306',
        database: 'db_filmes',
        user: 'root',
        password: '1234',
        multipleStatements:true 
        
        // Conexão com banco de dados externo
        // host: '52.190.20.198',
        // port: '3306',
        // database: 'db_filmes',
        // user: 'izaias',
        // password: '1234',
        // multipleStatements:true // permite a execução de várias queries ao mesmo tempo
    });
    console.log("Conectou no MySQL!");
    global.connection = con;
    return con;
}


module.exports = { connection };