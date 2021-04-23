const { Model, DataTypes } = require("sequelize");

class Group extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsToMany(models.Teacher, { through: "teacherGroup" });
        this.belongsToMany(models.Student, { through: "studentGroup" });
        this.hasOne(models.Invite);
    }
}

module.exports = Group;