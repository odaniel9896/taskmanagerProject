const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//IMPORT DAS MODELS

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Group = require("../models/Group");
const School = require("../models/School");
const User = require("../models/User");
const Invite = require("../models/Invite");


const connection = new Sequelize(dbConfig.url, dbConfig.config);


//INICIALIZA OS MODELS

Student.init(connection);
Teacher.init(connection);
Group.init(connection);
School.init(connection);
User.init(connection);
Invite.init(connection);

//INICIALIZA OS RELACIONAMENTOS
Student.associate(connection.models);
Teacher.associate(connection.models);
Group.associate(connection.models);
School.associate(connection.models);
User.associate(connection.models);
Invite.associate(connection.models);




for (let assoc of Object.keys(User.associations)) {
    for (let accessor of Object.keys(User.associations[assoc].accessors)) {
        console.log(User.name + '.' + User.associations[assoc].accessors[accessor] + '()');
    }
}