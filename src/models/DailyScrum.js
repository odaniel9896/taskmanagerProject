const { Model, DataTypes } = require("sequelize");

class DailyScrum extends Model {
    static init(sequelize) {
        super.init(
            {
                doneYesterday: DataTypes.STRING,
                goingToDoDay: DataTypes.STRING,
                someObstacle: DataTypes.STRING,
                sprintId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Sprint);
    }
}

module.exports = DailyScrum;