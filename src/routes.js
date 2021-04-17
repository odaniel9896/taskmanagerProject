const express = require("express");

//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");
const sessionController =  require("./controller/sessions");
const teacherController = require("./controller/teachers")

//IMPORT DOS MIDDLEWARE

const emailMiddleware = require("./services/emailConfirmation");
const verifyEmailMiddleware = require("./services/emailConfirmation")

//IMPORT DOS MIDDLEWARES

const studentValidators = require("./validators/students");

const routes = express.Router();

//Rotas para o Student
routes.get("/students", studentController.index);
routes.post("/students", studentValidators.create, studentController.store);

//Rotas para o Professor

routes.post("/teachers", teacherController.store);


//ROTAS PARA A SEÇÃO
routes.post("/login", sessionController.store);

//Verificar cadastro
routes.get('/verify', emailMiddleware.verifyEmail);

module.exports = routes;