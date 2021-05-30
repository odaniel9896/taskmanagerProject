const { Model, DataTypes } = require("sequelize");

class Group extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                image: DataTypes.STRING
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
        this.hasOne(models.Chat);
        this.hasOne(models.Workspace);
        this.hasOne(models.Sprint);
        this.hasMany(models.ProductBacklog);
        this.hasMany(models.Message);
    }
}

module.exports = Group;