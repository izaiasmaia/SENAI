import { Router } from 'express';
const router = Router();

import  clienteController  from '../Controllers/clienteController.js';

router.post('/register/new', clienteController.adicionarCliente);

router.use(function(req, res){
    res.json({message:'404 - Página não encontrada'})
})

export default router;