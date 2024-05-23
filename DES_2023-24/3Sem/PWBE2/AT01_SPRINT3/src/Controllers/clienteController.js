
import Cliente from '../Models/Cliente.js';
import { insert, verificaCpfJaCadastrado } from '../Models/clienteModel.js';

const clienteController = {

    adicionarCliente: async (req, res) => {
        try {
            let body = null;
            let retAll;

            // Verifica o tipo de objeto que chega pelo corpo da requisição, caso seja um 'object' o mesmo é convertido em um array
            if (typeof req.body === 'object' && !Array.isArray(req.body)) {
                console.log(`Objeto do tipo Object`);
                body = [req.body];
            } else {
                body = req.body
            }

            // Realiza a leitura de todos os itens que compõe esse array
            const response = body.map(async (data) => {

                // Desestrutura os dados recebidos do corpo (body). Endereço e telefone podem ter mais de um, portanto podem ser fornecidos em formato de array de objetos [{}]
                const { nome, data_nasc, cpf, sexo, estado_civil, email, telefone } = data;
                // console.log(nome, data_nasc, cpf, sexo, estado_civil, email, telefone);

                let result = null;
                // Cria o objeto cliente de acordo com a classe
                const newCliente = new Cliente({ nome, data_nasc, cpf, sexo, estado_civil, email, telefone });

                // Valida se os campos de preenchimento obrigatório estão preenchidos corretamente
                if (!newCliente.validarCampos()) {
                    console.log(`O arquivo informado possui informações faltantes`);
                    return { itemNome: newCliente.nome, itemCpf: newCliente.cpf, message: `O arquivo informado possui informações faltantes` }
                }

                // Valida o número do CPF
                if (!newCliente.validaCpf()) {
                    console.log(`CPF inválido, verifique e tente novamente`);
                    return { itemNome: newCliente.nome, itemCpf: newCliente.cpf, message: `CPF inválido, verifique e tente novamente` };
                }

                // Verifica se o CPF informado já encontra-se cadastrado no banco de dados
                result = await verificaCpfJaCadastrado(newCliente.cpf);
                if (result > 0) {
                    // console.log(`O CPF: ${newCliente.cpf} já encontra-se cadastrado no banco de dados.`);
                    return { itemNome: newCliente.nome, itemCpf: newCliente.cpf, message: `O CPF: ${newCliente.cpf} já encontra-se cadastrado no banco de dados.` };
                }
                result = null;

                // Chama a função para iserir no banco de dados passando o objeto criado como parâmetro
                result = await insert(newCliente);

                return { status: 'Registro inserido com sucesso', itemNome: newCliente.nome, itemCpf: newCliente.cpf, message: result };
            });

            // Todos os return em response são adicionados em forma de objetos na variável 'retAll, dessa forma, nenhuma mensagem de erro ou sucesso será perdida.
            retAll = await Promise.all(response);
            console.log(retAll);
            // Retorna para a requisição após terminar toda a execução dentro de 'response'
            return res.json(retAll);

        } catch (error) {
            console.log(error);
            // let error_message = verificaErro(error);
            res.json(error);
        }
    },


};

export default clienteController;