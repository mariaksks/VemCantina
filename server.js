const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexão com o MySQL
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "vemcantina"
});

db.connect(err => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("Conectado ao MySQL!");
    }
});

// Rota para buscar pedidos
app.get("/pedidos", (req, res) => {
    db.query("SELECT * FROM pedidos ORDER BY horario DESC", (err, result) => {
        if (err) {
            res.status(500).json({ erro: "Erro ao buscar pedidos" });
        } else {
            res.json(result);
        }
    });
});

// Rota para adicionar um novo pedido
app.post("/pedidos", (req, res) => {
    const { prato } = req.body;
    if (!prato) {
        return res.status(400).json({ erro: "Prato inválido" });
    }

    db.query("INSERT INTO pedidos (prato) VALUES (?)", [prato], (err, result) => {
        if (err) {
            res.status(500).json({ erro: "Erro ao registrar pedido" });
        } else {
            res.json({ mensagem: "Pedido registrado!" });
        }
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
