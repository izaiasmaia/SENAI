
const Cliente = require('../Models/Cliente');
const Endereco = require('../Models/Endereco');
const Telefone = require('../Models/Telefone');
const { insert } = require('../Models/clienteModel');

const clienteController = {

    //Retorna a página inicial do projeto
    // index: (req, res) => {
    //     try {
    //         res.render('pages/index');
    //     }
    //     catch (error) {
    //         console.log(error);
    //         let error_message = verificaErro(error);
    //         res.render('pages/pag_erro', { message: error_message });
    //     }
    // },
    // CREATE/INSERE - CRIA UM NOVO REGISTRO
    adicionarCliente: async (req, res) => {
        try {
            // Desestrutura os dados recebidos do corpo (body). Endereço e telefone podem ter mais de um, portanto podem ser fornecidos em formato de array de objetos [{}]
            const { nome, dt_nasc, cpf, endereco, telefone } = req.body;

            // Cria o objeto cliente de acordo com a classe endereço
            const objCliente = new Cliente(null, nome, dt_nasc, cpf);
            // Cria uma variável do tipo array que deve receber um ou mais objetos do tipo 'Endereço' ou 'Telefone' 
            const objEndereco = [];
            const objTelefone = [];

            // Realiza a leitura da variável 'endereço', originada na desestruturação, criando os objetos de acordo com a classe.
            if (endereco.length > 0) {
                endereco.forEach(value => {
                    objEndereco.push(new Endereco(value));
                });
            }

            // Realiza a leitura da variável 'telefone', originada na desestruturação, criando os objetos de acordo com a classe.
            if (telefone.length > 0) {
                telefone.forEach(value => {
                    objTelefone.push(new Telefone(value));
                });
            }
            //
            // const sqlCliente = await Cliente.create();:
            // Aciona a função insert da modelCliente
            const result = await insert(objCliente, objEndereco, objTelefone);

            // executeSQLQueryParams(sql, params);
            return res.json(result);

        } catch (error) {
            console.log(error);
            // let error_message = verificaErro(error);
            res.json(error);
        }
    },

};

module.exports = clienteController