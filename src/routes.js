const express = require("express");

//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");

//IMPORT DOS MIDDLEWARE

const emailMiddleware = require("./middleware/emailConfirmation");
const verifyEmailMiddleware = require("./middleware/emailConfirmation")

const routes = express.Router();

//Rotas para o Student

routes.post("/students", studentController.store);

//Verificar cadastro
// routes.get('/verify', emailMiddleware.verifyEmail);

module.exports = routes;