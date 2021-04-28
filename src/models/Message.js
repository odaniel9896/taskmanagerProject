const { Model, DataTypes } = require("sequelize");

class Message extends Model {
    static init(sequelize) {
        super.init(
            {
                text: DataTypes.STRING,
                userId: DataTypes.INTEGER,
                groupId: DataTypes.INTEGER,
                chatId: DataTypes.INTEGER

            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.User);
        this.belongsTo(models.Chat);
        this.belongsTo(models.Group);
    }
}

module.exports = Message;