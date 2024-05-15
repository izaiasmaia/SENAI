// Import do framework Express
const express = require("express");
const clienteRoute = require('./src/routes/clienteRoute')

const app = express();

app.use(express.json());

app.use('/', clienteRoute);

// INICIA O SERVIDOR NA PORTA INFORMADA
app.listen(3000, () => {
    console.log("Servidor respondendo na porta 3000");
});