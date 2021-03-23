const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//IMPORT DAS MODELS

const Student = require("../models/Student")

const connection = new Sequelize(dbConfig);


//INICIALIZA OS MODELS

Student.init(connection)

//INICIALIZA OS RELACIONAMENTOS 