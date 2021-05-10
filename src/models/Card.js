const { Model, DataTypes } = require("sequelize");

class Card extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                dueDate: DataTypes.DATE,
                listId: DataTypes.INTEGER,              
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.List);
        this.belongsToMany(models.User, { through: "usersCard" });
    }
}

module.exports = Card;