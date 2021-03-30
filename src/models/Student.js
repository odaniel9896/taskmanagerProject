const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                isValid: DataTypes.BOOLEAN,
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                profileImage: DataTypes.STRING,
                
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
    }
}

module.exports = Student;