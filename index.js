const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
//const connectionString = require(conexao.js);

//para fazer um bloco assíncrono e já executando este bloco (ao invés de criar uma função e chamar em seguida)
(async () => {

    console.info("Aguardando conexão com o banco de dados");

    const sourceFile = require('./conexao');  //dados da conexão não vão para o github
    console.log(sourceFile.connectionString);

    const client = await mongodb.MongoClient.connect(sourceFile.connectionString, {
        useUnifiedTopology: true,
    });

    console.info("Banco de dados conectado!");

    const app = express();
    const port = process.env.PORT || 3000;

    const jsonParser = bodyParser.json();
    app.use(jsonParser);

    app.get('/', (req, res) => {
        res.send('Hello world com MongoDB!');
    });

    // Endpoints de envio de mensagens
    // CRUD -> Create, Read (Read All e Read Single), Update and Delete
    // CRUD -> Criar, Ler (Ler tudo e ler individualmente), atualizar e remover

    const mensagens = [];

    // Read All
    app.get('/mensagens', (req, res) => {
        res.json(mensagens.filter(Boolean));
    });

    // Create
    app.post('/mensagens', (req, res) => {});

    // Read Single
    app.get('/mensagens/:id', (req, res) => {});

    // Update
    app.put('/mensagens/:id', (req, res) => {});

    // Delete
    app.delete('/mensagens/:id', (req, res) => {});

    app.listen(port, () => {
        console.log(`App rodando em http://localhost:${port}`);
    });

    //é o final da chamada do bloco assíncrono
})();