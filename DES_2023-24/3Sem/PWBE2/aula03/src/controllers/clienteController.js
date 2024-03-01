
const clienteModel  = require('../models/ClienteModel')



const clienteController = {
    // RETORNA TODOS OS CLIENTES EXISTENTES NA TABELA CLIENTES
    selecionarTodosClientes: async (req, res) => {
        try {
            const clientes = await clienteModel.selecionaTodosClientes();
            return res.json(clientes);

        } catch (error) {
            throw error
        }

    },

    // RETORNA O CLIENTE COM BASE NO ID INFORMADO
    selecionarUmCliente: async (req, res) => {
        try {
            const { id } = req.params;
            const cliente = await clienteModel.selectOneCliente(id);
            return res.json(cliente)

        } catch (error) {
            throw error
        }
    },

    // CREATE - CRIA UM NOVO CLIENTE
    adicionarCliente: async (req, res) => {
        try {
            const { nome, idade } = req.body;
            const result = await clienteModel.insertCliente({ nome: nome, idade: idade });
            console.log(result);
            const clientes = await clienteModel.selecionaTodosClientes();
            return res.json(clientes);

        } catch (error) {
            throw error
        }
    },

    alterarCliente: async (req, res) => {
        try {
            const { id } = req.params;
            const { nome, idade } = req.body;

            const result2 = await clienteModel.updateCliente(id, { nome: nome, idade: idade });

            const clientes = await clienteModel.selecionaTodosClientes();
            return res.json(clientes);

        } catch (error) {
            throw error
        }
    },
    deletarCliente: async (req, res) => {
        try {
            const { id } = req.params;
            // return res.json(await deleteCliente(id),{ message: `Registro deletado com sucesso!` });
            var result = await clienteModel.deleteCliente(id);
            if(result.affectedRows > 0){
                return res.status(200).send(`Registro excluído com sucesso!`)
            }else{
                return res.send("Registro não localizado");
            }            

        } catch (error) {
            throw error
        }
    }
};


    module.exports = clienteController