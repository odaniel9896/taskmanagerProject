const express = require("express");

//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");
const sessionController =  require("./controller/sessions")

//IMPORT DOS MIDDLEWARE

const emailMiddleware = require("./controller/emailConfirmation");
const verifyEmailMiddleware = require("./controller/emailConfirmation")

//IMPORT DOS MIDDLEWARES

const studentValidators = require("./validators/students");

const routes = express.Router();

//Rotas para o Student
routes.get("/students", studentController.index);
routes.post("/students", studentValidators.create, studentController.store);


//ROTAS PARA A SEÇÃO
routes.post("/login", sessionController.store);

//Verificar cadastro
routes.get('/verify', emailMiddleware.verifyEmail);

module.exports = routes;