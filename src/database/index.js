const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//IMPORT DAS MODELS

const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Group = require("../models/Group");
const School = require("../models/School");
const User = require("../models/User");


const connection = new Sequelize(dbConfig);


//INICIALIZA OS MODELS

Student.init(connection);
Teacher.init(connection);
Group.init(connection);
School.init(connection);
User.init(connection);

//INICIALIZA OS RELACIONAMENTOS
Student.associate(connection.models);
Teacher.associate(connection.models);
Group.associate(connection.models);
School.associate(connection.models);
User.associate(connection.models);




for (let assoc of Object.keys(Student.associations)) {
    for (let accessor of Object.keys(Student.associations[assoc].accessors)) {
        console.log(Student.name + '.' + Student.associations[assoc].accessors[accessor] + '()');
    }
}