const express = require("express");


//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");
const sessionController =  require("./controller/sessions");
const teacherController = require("./controller/teachers");
const passwordController = require("./controller/password.js");
const groupController = require("./controller/group")

//IMPORT DOS SERVICES

const emailMiddleware = require("./services/emailConfirmation");
const verifyEmailMiddleware = require("./services/emailConfirmation")

//IMPORT DOS MIDDLEWARES

const authMiddleware = require("./middleware/authorization");

//IMPORT DOS VALIDATOR
const studentValidators = require("./validators/students");
const teacherValidators =  require("./validators/teachers");
const userValidator =  require("./validators/user");
const sessionValidator = require("./validators/session")

const routes = express.Router();
//     ROTAS PUBLICAS
routes.get("/students", studentController.index);
routes.post("/students", studentValidators.create, studentController.store);



routes.post("/teachers", teacherValidators.create, teacherController.store);

routes.get("/emailpassword", passwordController.sendEmailPassword);
routes.put("/passwordreset", emailMiddleware.passwordEmailReset);


routes.post("/login", sessionValidator.create, sessionController.store);

routes.get('/verify', emailMiddleware.verifyEmail);

routes.use(authMiddleware)

//       ROTAS PRIVADAS
routes.post("/group", groupController.store);
routes.get("/group", groupController.index)



module.exports = routes;