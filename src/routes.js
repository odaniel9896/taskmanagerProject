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
const teacherValidators =  require("./validators/teachers");
const userValidator =  require("./validators/user");
const sessionValidator = require("./validators/session")

const routes = express.Router();

//Rotas para o Student
routes.get("/students", studentController.index);
routes.post("/students", studentValidators.create, studentController.store);

//Rotas para o Professor

routes.post("/teachers", teacherValidators.create, teacherController.store);


//ROTAS PARA A SEÇÃO
routes.post("/login", sessionValidator.create, sessionController.store);

//Verificar cadastro
routes.get('/verify', emailMiddleware.verifyEmail);

module.exports = routes;