import conectarBancoDeDados from '../config/db.js';

// Função para inserir registro no banco de dados
async function insert(cliente) {
    // Cria a variável para utilizar a conexão com o banco de dados
    const connection = await conectarBancoDeDados();
    try {

        const res = await connection.query('INSERT INTO tbl_clientes (nome, data_nasc, cpf, sexo, estado_civil, email, telefone) VALUES (?, ?, ?, ?, ?, ?, ?)', [cliente.nome, cliente.data_nasc, cliente.cpf, cliente.sexo, cliente.estado_civil, cliente.email, cliente.telefone]);
        console.log('RESULTADO INSERT CLIENTE =>', res);

        return ('Transação concluída com sucesso.', res)
    } catch (error) {
        console.log(error);
        return (error);
    } finally {
        connection.release();
    }
}

// Verifica se o CPF já está cadastrado no banco de daods antes de cadastrar.
async function verificaCpfJaCadastrado(cpf) {
    const connection = await conectarBancoDeDados();
    try {
        // Verifica so o CPF informado já está cadastrado no banco de dados
        const res = await connection.query('SELECT COUNT(*) AS TOTAL FROM tbl_clientes WHERE cpf=?', [cpf]);
        // console.log('RESULTADO SELECT CPF JÁ CADASTARDO =>',res);

        // Retorna a quantidade obtida no select
        return (res[0][0].TOTAL)
    } catch (error) {
        console.log(error);
        return (error);
    } finally {
        connection.release();
    }
}

export { insert, verificaCpfJaCadastrado };