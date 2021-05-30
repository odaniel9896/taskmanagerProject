const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//IMPORT DAS MODELS

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Group = require("../models/Group");
const School = require("../models/School");
const User = require("../models/User");
const Invite = require("../models/Invite");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const Annotation = require("../models/Annotation");
const List = require("../models/List");
const Workspace = require("../models/Workspace");
const Card = require("../models/Card");
const SprintReview = require("../models/SprintReview");
const DailyScrum = require("../models/DailyScrum");
const ProductBacklog = require("../models/ProductBacklog");
const Sprint = require("../models/Sprint");
const SprintRetrospective = require("../models/SprintRetrospective");
const SprintPlanning = require("../models/SprintPlanning");
const Priority = require("../models/Priority");


const connection = new Sequelize(dbConfig.url, dbConfig.config);


//INICIALIZA OS MODELS

Student.init(connection);
Teacher.init(connection);
Group.init(connection);
School.init(connection);
User.init(connection);
Invite.init(connection);
Chat.init(connection);
Message.init(connection);
Annotation.init(connection);
Card.init(connection);
List.init(connection);
Workspace.init(connection);
SprintReview.init(connection);
DailyScrum.init(connection);
SprintRetrospective.init(connection);
ProductBacklog.init(connection);
SprintPlanning.init(connection);
Sprint.init(connection);
Priority.init(connection);



//INICIALIZA OS RELACIONAMENTOS
Student.associate(connection.models);
Teacher.associate(connection.models);
Group.associate(connection.models);
School.associate(connection.models);
User.associate(connection.models);
Invite.associate(connection.models);
Chat.associate(connection.models);
Message.associate(connection.models);
Annotation.associate(connection.models);
Card.associate(connection.models);
List.associate(connection.models);
Workspace.associate(connection.models);
SprintReview.associate(connection.models);
DailyScrum.associate(connection.models);
SprintRetrospective.associate(connection.models);
ProductBacklog.associate(connection.models);
SprintPlanning.associate(connection.models);
Sprint.associate(connection.models);
Priority.associate(connection.models);


for (let assoc of Object.keys(Group.associations)) {
    for (let accessor of Object.keys(Group.associations[assoc].accessors)) {
        console.log(Group.name + '.' + Group.associations[assoc].accessors[accessor] + '()');
    }
}
module.exports = connection