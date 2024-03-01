// Import do framework Express
const express = require("express");

const app = express();

app.use(express.json());

// RETORNA TODOS OS CLIENTES EXISTENTES NA TABELA CLIENTES
app.get("/clientes", async (req, res) => {
    const clientes = await selectCliente();
    return res.json(clientes);
});

// RETORNA O CLIENTE COM BASE NO ID INFORMADO
app.get("/clientes/:id", async (req, res) => {
    const { id } = req.params;
    const cliente = await selectOneCliente(id);
    return res.json(cliente)
});

// CREATE - CRIA UM NOVO CLIENTE
app.post('/clientes', async (req, res) => {
    const { nome, idade } = req.body;
    const result = await insertCliente({ nome: nome, idade: idade });
    console.log(result);
    const clientes = await selectCliente();
    return res.json(clientes);
});




// UPDATE - ATUALIZANDO UM CLIENTE
app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const result2 = await updateCliente(id, { nome: nome, idade: idade });

    const clientes = await selectCliente();
    return res.json(clientes);
});




// EXCLUINDO UM CLIENTE
app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    var result = await deleteCliente(id);
    console.log(result);
    if (result[0].affectedRows != 0)
        return res.status(200).json(`Registro excluído com sucesso!`);
    else
        return res.json('Registro não localizado');
});



// BANCO DE DADOS
async function connect() {

    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }
    const mysql2 = require("mysql2/promise");
    const con = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes',
        user: 'root',
        password: '1234'
    });
    console.log("Conectou no MySQL!");
    global.connection = con;
    return con;
}

// SELECIONA TODOS OS REGISTROS DA TABELA CLIENTES;
async function selectCliente() {
    const conn = await connect();
    const [rows] = await conn.query('select * from clientes;');
    return rows;
}

// SELECIONA O REGISTRO DESEJADO NA TABELA CLIENTES;
async function selectOneCliente(id) {
    const conn = await connect();
    const sql = 'SELECT * FROM clientes WHERE id=?;';
    const values = id;
    const [rows] = await conn.query(sql, values);
    console.log(await conn.query(sql, values));
    return rows;
}

// INSERE UM NOVO REGISTRO NA TABELA CLIENTES;
async function insertCliente(cliente) {
    const conn = await connect();
    const sql = 'INSERT INTO clientes(nome,idade) VALUES (?,?);';
    const values = [cliente.nome, cliente.idade];
    return await conn.query(sql, values);
}





// ATUALIZA UM REGISTRO DA TABELA CLIENTES;
async function updateCliente(id, cliente) {
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?';
    const values = [cliente.nome, cliente.idade, id];
    return await conn.query(sql, values);
}

// DELETA UM REGISTRO DA TABELA CLIENTES;
async function deleteCliente(id) {
    const conn = await connect();
    const sql = 'DELETE FROM clientes where id=?;';
    return await conn.query(sql, id);
}


// INICIA O SERVIDOR NA PORTA INFORMADA
app.listen(5500, () => {
    console.log("Servidor respondendo na porta 5500");
});