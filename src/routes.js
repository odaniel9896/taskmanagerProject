const express = require("express");

//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");

//IMPORT DOS MIDDLEWARE

const emailMiddleware = require("./controller/emailConfirmation");
const verifyEmailMiddleware = require("./controller/emailConfirmation")

const routes = express.Router();

//Rotas para o Student
routes.get("/students", studentController.index);
routes.post("/students", studentController.store);

//Verificar cadastro
routes.get('/verify', emailMiddleware.verifyEmail);

module.exports = routes;