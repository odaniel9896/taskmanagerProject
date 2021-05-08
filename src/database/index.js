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




for (let assoc of Object.keys(Student.associations)) {
    for (let accessor of Object.keys(Student.associations[assoc].accessors)) {
        console.log(Student.name + '.' + Student.associations[assoc].accessors[accessor] + '()');
    }
}