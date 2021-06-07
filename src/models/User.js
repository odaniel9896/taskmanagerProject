const { Model, DataTypes } = require("sequelize");

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                email: DataTypes.STRING,
                password: DataTypes.STRING,
                role: DataTypes.STRING,
                isValid: DataTypes.BOOLEAN,
                confirmationCode: DataTypes.STRING,
                passwordToken: DataTypes.STRING

            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.Student, { foreignKey: "id" });
        this.hasOne(models.Teacher, { foreignKey: "id" });
        this.hasOne(models.Invite);
        this.hasMany(models.Annotation);
        this.hasMany(models.Message);
        this.hasMany(models.Answer);
        this.hasMany(models.Question);
    }
}

module.exports = User;