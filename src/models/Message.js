const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');


class Message extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: () => uuidv4(),
                },
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