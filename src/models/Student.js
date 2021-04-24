const { Model, DataTypes } = require("sequelize");

class Student extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                profileImage: DataTypes.STRING,              
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsToMany(models.Group, { through: "studentGroup" });
        this.belongsTo(models.User, { foreignKey: "id" });
    }
}

module.exports = Student;