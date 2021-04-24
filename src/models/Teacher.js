const { Model, DataTypes } = require("sequelize");

class Teacher extends Model {
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
        this.belongsToMany(models.School, { through: "teacherSchool" });
        this.belongsToMany(models.Group, { through: "teacherGroup" });
        this.belongsTo(models.User, { foreignKey: "id" });
    }
}

module.exports = Teacher;