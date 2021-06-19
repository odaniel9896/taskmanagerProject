const { Model, DataTypes } = require("sequelize");

class Card extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                initialDate: DataTypes.DATE,
                dueDate: DataTypes.DATE,
                order: DataTypes.INTEGER,
                listId: DataTypes.INTEGER,
                storieId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.List);
        this.belongsToMany(models.User, { through: "usersCard" });
        this.belongsTo(models.ProductBacklog, {foreignKey: "storieId"});
        this.hasMany(models.Task);
    }
}

module.exports = Card;