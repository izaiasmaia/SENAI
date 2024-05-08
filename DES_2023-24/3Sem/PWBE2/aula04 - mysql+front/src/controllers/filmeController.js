
const filmeModel = require('../models/FilmeModel')



const clienteController = {

    //Retorna a página inicial do projeto
    index: (req, res) => {
        try {
            res.render('pages/index');
        }
        catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },
    // CREATE - CRIA UM NOVO FILME
    adicionarFilme: async (req, res) => {
        try {
            const { titulo, ano } = req.body;
            console.log(titulo, ano);
            const result = await filmeModel.insertFilme({ titulo: titulo, ano: ano });
            console.log(result);

            const filmes = await filmeModel.listar_db();


            if (result[0].affectedRows > 0) {
                return res.render('pages/listar', { filmes: filmes, message: `Registro incluído com sucesso!`, success: true });
            } else {
                return res.render('pages/listar', { filmes: filmes, message: `Registro não incluído, tente novamente!`, success: true });
            }


        } catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },
    // Retorna a página de cadastro de filmes
    cadastro: (req, res) => {
        try {
            res.render('pages/cadastro');
        }
        catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },
    // Retorna todos os filmes cadastrados na tabela
    listar: async (req, res) => {
        try {
            const filmes = await filmeModel.listar_db();
            // return res.json(filmes);
            return res.render('pages/listar', { filmes, success: false });

        } catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },
    // Retorna a página de edição já com o item a ser editado
    editar: async (req, res) => {
        try {
            const { id } = req.params;
            // const { titulo, ano } = req.body;
            // console.log(id, titulo, ano);
            const result = await filmeModel.selecionaPorId(id);
            // console.log(result);
            // const clientes = await clienteModel.selecionaTodosClientes();
            return res.render('pages/editar', { data: result });

        } catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },
    // Salva a edição do item 
    salvarEdicao: async (req, res) => {
        try {
            // console.log('testeeeeeeee');
            // const { id } = req.params;
            const { id, titulo, ano } = req.body;
            console.log(id, titulo, ano);
            const result = await filmeModel.updateFilme(id, { titulo: titulo, ano: ano });
            console.log(result);
            // const clientes = await clienteModel.selecionaTodosClientes();
            const filmes = await filmeModel.listar_db();
            // return res.json(filmes);
            return res.render('pages/listar', { filmes });
        } catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },
    // Deletar um item
    deletarFilme: async (req, res) => {
        try {
            const { id } = req.params;
            // return res.json(await deleteCliente(id),{ message: `Registro deletado com sucesso!` });
            var result = await filmeModel.deleteFilme(id);
            console.log(result);
            if (result[0].affectedRows > 0) {
                return res.json({ message: `Registro excluído com sucesso!`, success: true })
            } else {
                return res.json({ message: `Registro não localizado!`, success: true });
            }

        } catch (error) {
            console.log(error);
            let error_message = verificaErro(error);
            res.render('pages/pag_erro', { message: error_message });
        }
    },

};

const verificaErro = (err) => {
    if (err.code === 'ECONNREFUSED'){
        let error_message ='Conexão com o servidor de banco de dados indisponível!';
        res.render('pages/pag_erro', { message: error_message });
    } 
    else {
        console.log('Ocorreu um erro ao processar sua solicitação!');
            let error_message = 'Ocorreu um erro ao processar sua solicitação!';
            res.render('pages/pag_erro', { message: error_message });
    }
}

module.exports = clienteController