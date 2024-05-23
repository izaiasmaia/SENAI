import { createPool } from 'mysql2/promise';

let pool = null;


/**
 * Cria um pool de conexões com o MySQL limitando a qantidade de conexões que podem ser criadas
 * @returns 
 */
async function criarPoolDeConexoes() {
    if (!pool) {
        pool = createPool({
            host: process.env.HOST,
            port: process.env.PORT_MYSQL,
            database: process.env.DATABASE,
            user: process.env.USER,
            password: process.env.PASSWORD,
            waitForConnections: true, // Aguarda conexões se não houver disponíveis no momento
            connectionLimit: 10, // Limite máximo de conexões no pool
            multipleStatements: true // Permitir a execução de várias queries ao mesmo tempo
        });
        // console.log("Pool de conexões criado.");
    }
    return pool;
}

async function obterConexaoDoPool() {
    const pool = await criarPoolDeConexoes();
    return pool.getConnection();
}

export default obterConexaoDoPool;
