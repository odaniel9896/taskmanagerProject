const { Model, DataTypes } = require("sequelize");

class SprintRetrospective extends Model {
    static init(sequelize) {
        super.init(
            {
                doneRight: DataTypes.STRING,
                doneError: DataTypes.STRING,
                fieldAction: DataTypes.TEXT,
                sprintId: DataTypes.INTEGER,
            },
            {
                sequelize,
                tableName : "retrospectives",
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Sprint);
    }
}

module.exports = SprintRetrospective;