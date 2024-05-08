const express = require("express");
const router = express.Router();




const filmeController = require("../controllers/filmeController");

router.get("/", filmeController.index)
router.get("/cadastro", filmeController.cadastro)
router.get("/listar", filmeController.listar);
router.get('/editar/:id', filmeController.editar);
router.post('/editar/filme', filmeController.salvarEdicao);
// router.get("/clientes/:id",  filmeController.selecionarClienteNome);
router.post('/cadastro/novo', filmeController.adicionarFilme);

router.post('/excluir/:id', filmeController.deletarFilme);

router.use(function(req, res){
    res.status(404).render(`pages/pag_erro`, {message:'404 - Página não encontrada'})
})

module.exports = router;