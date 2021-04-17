const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                role: DataTypes.STRING,
                isValid: DataTypes.BOOLEAN,
                confirmationCode: DataTypes.STRING
                
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.Student);
        this.hasOne(models.Teacher);
    }
}

module.exports = User;