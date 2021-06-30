//import do express
const express = require("express");
const { errors, isCelebrateError } = require("celebrate");

const cors = require("cors");

require("dotenv").config();

const routes = require("./routes");

require("./database");

//inicializa o projeto app
const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.use(errors());

module.exports = app;
