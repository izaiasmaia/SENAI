const {connection} = require(`../config/db`);

const modelCliente = {

    // SELECIONA TODOS OS REGISTROS DA TABELA CADASTRO;
    listar_db: async () => {
        try {            
            const conn = await connection();
            const [rows] = await conn.query('select * from tbl_cadastro;');
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // SELECIONA O REGISTRO DESEJADO NA TABELA CADASTRO;
    selecionaPorId: async (id) => {
        try {
            const conn = await connection();
            const sql = 'SELECT * FROM tbl_cadastro WHERE id=?;';
            const values = id;
            const [rows] = await conn.query(sql, values);
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // SELECIONA O REGISTRO DESEJADO NA TABELA CADASTRO POR NOME;
    selectClienteNome: async (id) => {
        try {
            const conn = await connection();
            const sql = `SELECT * FROM tbl_cadastro WHERE titulo=?;`;
            const values = `${id}`;
            const [rows] = await conn.query(sql, values);
            return rows;

        } catch (error) {
            throw error;
        }
    },
    // INSERE UM NOVO REGISTRO NA TABELA CADASTRO;
    insertFilme: async (filme) => {
        try {
            const conn = await connection();
            const sql = 'INSERT INTO tbl_cadastro(titulo,ano) VALUES (?,?);';
            const values = [filme.titulo, filme.ano];
            return await conn.query(sql, values);

        } catch (error) {
            throw error;
        }
    },
    // ATUALIZA UM REGISTRO DA TABELA CADASTRO;
    updateFilme: async (id, filme) => {
        try {
            const conn = await connection();
            const sql = 'UPDATE tbl_cadastro SET titulo=?, ano=? WHERE id=?';
            const values = [filme.titulo, filme.ano, id];
            return await conn.query(sql, values);

        } catch (error) {
            throw error;
        }
    },
    // DELETA UM REGISTRO DA TABELA CADASTRO;
    deleteFilme: async (id) => {
        try {
            const conn = await connection();
            const sql = 'DELETE FROM tbl_cadastro where id=?;';
            return await conn.query(sql, [id]);

        } catch (error) {
            throw error;
        }
    },
}

module.exports = modelCliente ;