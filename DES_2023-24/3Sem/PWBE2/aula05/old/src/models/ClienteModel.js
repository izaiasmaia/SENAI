const conectarBancoDeDados = require('../config/db');

async function insert(cliente) {
    const connection = await conectarBancoDeDados();

    try {
        await connection.beginTransaction();
        // Execute suas queries aqui
        const res = await connection.query('INSERT INTO clientes (nome, idade) VALUES (?, ?)', [cliente.nome, cliente.idade]);
        // const [result] = await connection.query('SELECT id FROM tabela_principal WHERE campo1 = ?', ['valor1']);
        console.log(res);
        // const idPrincipal = res[0].insertId;
        await connection.query('INSERT INTO telefones (id_cliente, numero) VALUES (?, ?)', [res[0].insertId, cliente.numero]);
        
        // Se todas as queries forem bem-sucedidas, comita a transação
        await connection.commit();
        console.log('Transação concluída com sucesso.');
    } catch (error) {
        // Em caso de erro, desfaça a transação
        await connection.rollback();
        return( error);
    } finally {
        // Fecha a conexão
        await connection.end();
    }
}
module.exports = {insert} ;
// const modelCliente = {

//     // SELECIONA TODOS OS REGISTROS DA TABELA CLIENTES;
//     selecionaTodosClientes: async () => {
//         try {
            
//             const conn = await connection();
//             const [rows] = await conn.query('select * from clientes;');
//             return rows;

//         } catch (error) {
//             throw error;
//         }
//     },
//     // SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES;
//     selectOneCliente: async (id) => {
//         try {
//             const conn = await connection();
//             const sql = 'SELECT * FROM clientes WHERE id=?;';
//             const values = id;
//             const [rows] = await conn.query(sql, values);
//             return rows;

//         } catch (error) {
//             throw error;
//         }
//     },
//     // SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES POR NOME;
//     selectClienteNome: async (id) => {
//         try {
//             const conn = await connection();
//             const sql = `SELECT * FROM clientes WHERE nome=?;`;
//             const values = `${id}`;
//             const [rows] = await conn.query(sql, values);
//             return rows;

//         } catch (error) {
//             throw error;
//         }
//     },
//     // INSERE UM NOVO REGISTRO NA TABELA CLIENTES;
//     insertCliente: async (cliente) => {
//         try {
//             const conn = await connection();
//             const sql = 'INSERT INTO clientes(nome,idade) VALUES (?,?);';
//             const values = [cliente.nome, cliente.idade];
//             return await conn.query(sql, values);

//         } catch (error) {
//             throw error;
//         }
//     },
//     // ATUALIZA UM REGISTRO DA TABELA CLIENTES;
//     updateCliente: async (id, cliente) => {
//         try {
//             const conn = await connection();
//             const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?';
//             const values = [cliente.nome, cliente.idade, id];
//             return await conn.query(sql, values);

//         } catch (error) {
//             throw error;
//         }
//     },
//     // DELETA UM REGISTRO DA TABELA CLIENTES;
//     deleteCliente: async (id) => {
//         try {
//             const conn = await connection();
//             const sql = 'DELETE FROM clientes where id=?;';
//             return await conn.query(sql, [id]);

//         } catch (error) {
//             throw error;
//         }
//     },
// }

