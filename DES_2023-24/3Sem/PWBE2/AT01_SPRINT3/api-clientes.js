// Import do framework Express
import express from 'express';
import router from './src/routes/index.js';
import bodyParser from 'body-parser';
import 'dotenv/config'; // Import das variáveis de ambiente utilizando a biblioteca dotenv, arquivo criado na raiz do projeto para armazenar as as variáveis de ambiente necessárias para uso na nossa aplicação

const app = express();


// BodyParser
const { json, urlencoded } = bodyParser;

// Configurar o BodyParser
app.use(json());
app.use(urlencoded({ extended: false }));

app.use(json());

app.use('/', router);

console.log(process.env)

// INICIA O SERVIDOR NA PORTA INFORMADA
app.listen(process.env.PORT, () => {
    console.log(`Servidor respondendo na porta ${process.env.PORT}`);
});

