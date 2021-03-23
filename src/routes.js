const express = require("express");

//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");

//IMPORT DOS MIDDLEWARE

const emailMiddleware = require("./middleware/emailConfirmation");
const verifyEmailMiddleware = require("./middleware/emailConfirmation")

const routes = express.Router();

//Rotas para o Student

routes.post("/students", studentController.store)
// routes.get("/sendEmail", emailMiddleware.sendEmail);

// routes.get('/verify', emailMiddleware.verifyEmail, studentController.store)

module.exports = routes;