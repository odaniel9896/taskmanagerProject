const express = require("express");


//IMPORT DOS CONTROLLERS

const studentController = require("./controller/student/students");
const sessionController =  require("./controller/session/sessions");
const teacherController = require("./controller/teachers/teachers");
const passwordController = require("./controller/password/password.js");
const groupController = require("./controller/group/group");
const userImage = require("./controller/image/userImage.js");
const groupImage = require("./controller/image/groupImage");
const memberGroup = require("./controller/group/memberGroup");
const annotationController = require("./controller/annotations/annotation");
const workspaceController = require("./controller/workspace/workspace");
const listController = require("./controller/list/lists");
const listOrderController = require("./controller/list/orderList");
const cardController = require("./controller/card/cards");
const cardOrderController = require("./controller/card/orderCard");
const dailyScrumsController = require("./controller/dailyscrum/dailyScrum")

//IMPORT DOS SERVICES

const emailMiddleware = require("./services/emailConfirmation");
const uploadFirebase = require("./services/uploadFirebase");
//IMPORT DOS MIDDLEWARES

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadImage");

//IMPORT DOS VALIDATOR
const studentValidators = require("./validators/students");
const teacherValidators =  require("./validators/teachers");
const sessionValidator = require("./validators/session");
const groupValidator = require("./validators/group");
const annotationValidator = require("./validators/annotations");


const routes = express.Router();

//     ROTAS PUBLICAS

//rotas para o estudante
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
routes.post("/group/images", uploadSingleImage, uploadFirebase, groupImage.store);


//rotas de alunos e professores privados
routes.put("/students", studentController.update);
routes.put("/teachers", teacherController.update);
routes.get("/students", studentController.find);
routes.get("/teachers", teacherController.find);


//Rotas para annotations

routes.get("/annotations", annotationController.index);
routes.post("/annotations", annotationValidator.create, annotationController.store);
routes.delete("/annotations/:id", annotationController.delete);
routes.put("/annotations/:id", annotationController.update);

// ROTAS PARA O WORKSPACE

routes.post("/workspace/:groupId", workspaceController.store);

//ROTAS PARA LISTAS

routes.get("/lists/:groupId", listController.index);
routes.post("/lists/:groupId", listController.store);
routes.put("/lists/:listId/:workspaceId", listController.update);
routes.delete("/lists/:listId/:groupId", listController.delete);
routes.put("/lists/:listId/:workspaceId/order", listOrderController.update);

//ROTAS PARA CARDS

routes.get("/cards/:listId", cardController.index);
routes.post("/cards/:listId", cardController.store);
routes.put("/cards/:cardId", cardController.update);
routes.delete("/cards/:cardId", cardController.delete);
routes.put("/cards/order/:cardId/:listId", cardOrderController.update);

//ROTAS PARA A DAILY_SCRUM

routes.post("/dailyScrum/:sprintId", dailyScrumsController.store);


module.exports = routes;