const { Model, DataTypes } = require("sequelize");

class Question extends Model {
    static init(sequelize) {
        super.init(
            {
                title: DataTypes.STRING,
                description: DataTypes.STRING,
                image: DataTypes.STRING,
            },
            {
                sequelize,
            }
        )
    }

    static associate(models) {
        this.belongsTo(models.User);
        this.hasMany(models.Answer);
    }
}

module.exports = Question;