const express = require("express");


//IMPORT DOS CONTROLLERS

const studentController = require("./controller/students");
const sessionController =  require("./controller/sessions");
const teacherController = require("./controller/teachers");
const passwordController = require("./controller/password.js");
const groupController = require("./controller/group");
const userImage = require("./controller/userImage.js");
const memberGroup = require("./controller/memberGroup");
const annotationController = require("./controller/annotation");
const workspaceController = require("./controller/workspace")

//IMPORT DOS SERVICES

const emailMiddleware = require("./services/emailConfirmation");
const verifyEmailMiddleware = require("./services/emailConfirmation")
const uploadFirebase = require("./services/uploadFirebase");
//IMPORT DOS MIDDLEWARES

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadImage");
//IMPORT DOS VALIDATOR
const studentValidators = require("./validators/students");
const teacherValidators =  require("./validators/teachers");
const sessionValidator = require("./validators/session");
const groupValidator = require("./validators/group");
const e = require("cors");



const routes = express.Router();

//     ROTAS PUBLICAS

//rotas para o estudante
routes.get("/students", studentController.index);
routes.post("/students", studentValidators.create, studentController.store);

//Rotas para o professor
routes.post("/teachers", teacherValidators.create, teacherController.store);


//rotas para atualizar senha
routes.get("/emailpassword/:email", passwordController.sendEmailPassword);
routes.put("/passwordreset", emailMiddleware.passwordEmailReset);

//login
routes.post("/login", sessionValidator.create, sessionController.store);


//verificar cadastro
routes.get('/verify', emailMiddleware.verifyEmail);

routes.use(authMiddleware)

//Rotas para grupo
routes.post("/group", groupValidator.create, groupController.store);
routes.get("/group", groupController.index);
routes.patch("/group/:inviteToken/add", memberGroup.addMemberGroup);
routes.post("/group/:groupId/invite", memberGroup.sendInviteGroup);
routes.delete("/group/:id", groupController.delete);
routes.put("/group/:id", groupController.update);
routes.delete("/group/:groupId/students/:idDeleteUser", memberGroup.deleteMemberGroup);

//Rotas para enviar imagens
routes.post("/user/images", uploadSingleImage, uploadFirebase, userImage.store);


//Rotas para annotations

routes.get("/annotations", annotationController.index);
routes.post("/annotations", annotationController.store);
routes.delete("/annotations/:id", annotationController.delete);
routes.put("/annotations/:id", annotationController.update);

// ROTAS PARA O WORKSPACE

routes.post("/workspace/:groupId", workspaceController.store);


module.exports = routes;