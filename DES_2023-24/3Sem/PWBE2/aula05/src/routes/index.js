const express = require("express");
const router = express.Router();

const ClienteController = require("../Controllers/clienteController");

// router.get("/", ClienteController.index);
router.post('/cadastro/novo', ClienteController.adicionarCliente);

// router.use(function(req, res){
//     res.status(404).render(`pages/pag_erro`, {message:'404 - Página não encontrada'})
// })

module.exports = router;