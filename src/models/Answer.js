const { Model, DataTypes } = require("sequelize");

class Answer extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                userId: DataTypes.INTEGER,
                questionId: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.Question);
        this.belongsTo(models.User);
    }
}

module.exports = Answer;