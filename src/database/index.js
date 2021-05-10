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



for (let assoc of Object.keys(Group.associations)) {
    for (let accessor of Object.keys(Group.associations[assoc].accessors)) {
        console.log(Group.name + '.' + Group.associations[assoc].accessors[accessor] + '()');
    }
}