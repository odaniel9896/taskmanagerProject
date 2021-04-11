//import do express
const express = require("express");
const cors = require("cors");


const routes = require("./routes");


require("./database");

//inicializa o projeto app
const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

module.exports = app;