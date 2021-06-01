const express = require("express");


//IMPORT DOS CONTROLLERS

const studentController = require("./controller/student/students");
const sessionController = require("./controller/session/sessions");
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
const dailyScrumsController = require("./controller/dailyscrum/dailyScrum");
const sprintReviewController = require("./controller/sprintReview/sprintReview");
const sprintRetrospectiveController = require("./controller/sprintRetrospective/sprintRetrospective");
const sprintController = require("./controller/sprint/sprint");
const productBacklogController = require("./controller/productBacklog/productBacklog");
const sprintPlanningController = require("./controller/sprintPlanning/sprintPlanning");
const feedController = require("./controller/feed/feed");
const messageController = require("./controller/message/message");
const taskController  = require("./controller/tasks/task");

//IMPORT DOS SERVICES

const emailMiddleware = require("./services/emailConfirmation");
const uploadFirebase = require("./services/uploadFirebase");
//IMPORT DOS MIDDLEWARES

const authMiddleware = require("./middleware/authorization");
const uploadSingleImage = require("./middleware/uploadImage");

//IMPORT DOS VALIDATOR
const studentValidators = require("./validators/students");
const teacherValidators = require("./validators/teachers");
const sessionValidator = require("./validators/session");
const groupValidator = require("./validators/group");
const annotationValidator = require("./validators/annotations");
const dailyScrumValidator = require("./validators/dailyScrum");
const sprintRetrospectiveValidator = require("./validators/sprintRetrospective");
const sprintReviewValidator = require("./validators/sprintReview");
const storiesValidator = require("./validators/stories");
const sprintValidator = require("./validators/sprint");
const cardValidator = require("./validators/cards");
const listValidator = require("./validators/lists");
const workspaceValidator = require("./validators/workspace");
const sprintPlanningValidator = require("./validators/sprintPlanning");
const taskValidator = require("./validators/task");




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
routes.get("/group/:groupId", groupController.find)
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
routes.put("/annotations/:id", annotationValidator.create, annotationController.update);

// ROTAS PARA O WORKSPACE

routes.post("/workspace/:groupId", workspaceValidator.create, workspaceController.store);

//ROTAS PARA LISTAS

routes.get("/lists/:groupId", listController.index);
routes.post("/lists/:groupId", listValidator.create, listController.store);
routes.put("/lists/:listId/:workspaceId", listController.update);
routes.delete("/lists/:listId/:groupId", listController.delete);
routes.put("/lists/:listId/:workspaceId/order", listOrderController.update);

//ROTAS PARA CARDS

routes.get("/cards/:listId", cardController.index);
routes.post("/cards/:listId", cardValidator.create, cardController.store);
routes.put("/cards/:cardId", cardController.update);
routes.delete("/cards/:cardId", cardController.delete);
routes.put("/cards/order/:cardId/:listId", cardOrderController.update);

//ROTAS PARA A SPRINTS

routes.post("/sprints/:groupId", sprintValidator.create, sprintController.store);
routes.put("/sprints/:sprintId", sprintController.update);

//ROTAS PARA A DAILY_SCRUM

routes.post("/dailyScrum/:sprintId", dailyScrumValidator.create, dailyScrumsController.store);
routes.get("/dailyScrum/:sprintId", dailyScrumsController.index);

//ROTAS PARA A SPRINT REVIEW

routes.post("/sprintReview/:sprintId", sprintReviewValidator.create, sprintReviewController.store);
routes.get("/sprintReview/:sprintId", sprintReviewController.index);

//ROTAS PARA A SPRINT RETROSPECTIVES

routes.post("/sprintRetrospective/:sprintId", sprintRetrospectiveValidator.create, sprintRetrospectiveController.store);
routes.get("/sprintRetrospective/:sprintId", sprintRetrospectiveController.index);

//ROTAS PARA A PRODUCT ProductBacklog

routes.post("/stories/:groupId", storiesValidator.create, productBacklogController.store);
routes.delete("/stories/:storieId/:groupId", storiesValidator.delete, productBacklogController.delete);

//ROTAS PARA A SPRINT SprintPlanning

routes.post("/sprintPlanning/:sprintId", sprintPlanningValidator.create, sprintPlanningController.store);


// ROTAS PARA O FEED

routes.get("/feed/:workspaceId", feedController.index); 

// ROTAS PARA AS MENSAGENS

routes.get("/messages/:chatId", messageController.index);

//ROTAS PARA AS TAREFAS DO CARD

routes.post("/task/:cardId", taskValidator.create, taskController.store);
routes.delete("/task/:taskId/:cardId", taskController.delete);

module.exports = routes;