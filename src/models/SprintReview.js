const { Model, DataTypes } = require("sequelize");

class SprintReview extends Model {
    static init(sequelize) {
        super.init(
            {
                feedback: DataTypes.STRING,
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

module.exports = SprintReview;