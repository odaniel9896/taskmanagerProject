const { Model, DataTypes } = require("sequelize");

class Teacher extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                profileImage: DataTypes.STRING,
                isValid: DataTypes.BOOLEAN,
                
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {

        //REALIZAR AS ASSOCIATE COM AS TABELAS NECESSARIAS 
    }
}

module.exports = Teacher;