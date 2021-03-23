//import do express
const express = require("express");

const routes = require("./routes");

require("./database");

//inicializa o projeto app
const app = express();

app.use(express.json());

app.use(routes);

module.exports = app;