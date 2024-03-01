// Import do framework Express
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    //testes para verificar se a rota está funcionando
    let i = 0;
    if (i = 0) {
        res.status(200).send("App funcionando").end();
    } else {
        res.status(404).send("Erro na requisição").end();
    }
})

app.get("/info/:marca/:modelo", (req, res) => {
    let { marca, modelo } = req.params;

    console.log(marca, modelo);

    return res.json({ aparelho: `Marca: ${marca}, Modelo: ${modelo}` })
});






const cursos = ['React Native', 'JavaScript', 'NodeJS']

// RETORNA TODOS OS CURSOS EXISTENTES NO ARRAY
app.get("/cursos", async (req, res) => {
    return res.json(cursos);
});

// RETORNA O CURSO SELECIONADO PELO INDEX ARMAZENADO NO ARRAY
app.get("/cursos/:index", (req, res) => {
    const { index } = req.params;
    return res.json(cursos[index])
});

// CREATE - CRIA UM NOVO CURSO
app.post('/cursos', (req, res) => {
    const { nome } = req.body;
    cursos.push(nome);
    return res.json(cursos);
});

// UPDATE - ATUALIZANDO UM CURSO
app.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { nome } = req.body

    cursos[index] = nome;
    console.log(cursos);
    return res.json(cursos);
});

// EXCLUINDO UM CURSO
app.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;

    const cursoDeletado = cursos[index];
    cursos.splice(index, 1);
    return res.json({ message: `Curso de ${cursoDeletado} deletado com sucesso!` });

    // Não envia nenhum tipo de mensagem
    // return res.send()
});


app.listen(8080, () => {
    console.log("Servidor respondendo na porta 8080");
});