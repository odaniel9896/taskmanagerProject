const { Model, DataTypes } = require("sequelize");

class SprintReview extends Model {
    static init(sequelize) {
        super.init(
            {
                sprintId: DataTypes.INTEGER,
                feedback: DataTypes.TEXT,
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

module.exports = SprintReview;