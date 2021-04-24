const express = require("express");


//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");
const sessionController =  require("./controller/sessions");
const teacherController = require("./controller/teachers");
const passwordController = require("./controller/password.js");
const groupController = require("./controller/group");
const userImage = require("./controller/userImage.js")

//IMPORT DOS SERVICES

const emailMiddleware = require("./services/emailConfirmation");
const verifyEmailMiddleware = require("./services/emailConfirmation")

//IMPORT DOS MIDDLEWARES

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadImage");
//IMPORT DOS VALIDATOR
const studentValidators = require("./validators/students");
const teacherValidators =  require("./validators/teachers");
const userValidator =  require("./validators/user");
const sessionValidator = require("./validators/session");
const uploadFirebase = require("./services/uploadFirebase");


const routes = express.Router();

//     ROTAS PUBLICAS

//rotas para o estudante
routes.get("/students", studentController.index);
routes.post("/students", studentValidators.create, studentController.store);

//Rotas para o professor
routes.post("/teachers", teacherValidators.create, teacherController.store);


//rotas para atualizar senha
routes.get("/emailpassword", passwordController.sendEmailPassword);
routes.put("/passwordreset", emailMiddleware.passwordEmailReset);

//login
routes.post("/login", sessionValidator.create, sessionController.store);


//verificar cadastro
routes.get('/verify', emailMiddleware.verifyEmail);

routes.use(authMiddleware)

//       ROTAS PRIVADAS
routes.post("/group", groupController.store);
routes.get("/group", groupController.index);

routes.post("/user/images", uploadSingleImage, uploadFirebase, userImage.store);



module.exports = routes;