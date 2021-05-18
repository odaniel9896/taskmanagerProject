const { Model, DataTypes } = require("sequelize");

class SprintRetrospective extends Model {
    static init(sequelize) {
        super.init(
            {
                doneRight: DataTypes.STRING,
                doneError: DataTypes.STRING,
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

module.exports = SprintRetrospective;