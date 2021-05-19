const { Model, DataTypes } = require("sequelize");

class Annotation extends Model {
    static init(sequelize) {
        super.init(
            {
                text: DataTypes.STRING,
                title: DataTypes.STRING,
                userId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.User);
    }
}

module.exports = Annotation;