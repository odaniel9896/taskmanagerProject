const { Model, DataTypes } = require("sequelize");

class Card extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                progressId: DataTypes.INTEGER,
                initialDate: DataTypes.DATE,
                dueDate: DataTypes.DATE,
                order: DataTypes.INTEGER,
                listId: DataTypes.INTEGER,
                priorityId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.List);
        this.belongsToMany(models.User, { through: "usersCard" });
        this.hasMany(models.Task);
        this.belongsTo(models.Priority)
        this.belongsTo(models.Progress)

    }
}

module.exports = Card;