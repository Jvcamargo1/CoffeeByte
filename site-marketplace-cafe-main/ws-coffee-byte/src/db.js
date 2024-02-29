require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE
});

connection.connect(error => {
    if(error) {
        console.log("Erro: " + error);
        return;
    }
    console.log("Conexão efetuada com sucesso!");
});

module.exports = connection;