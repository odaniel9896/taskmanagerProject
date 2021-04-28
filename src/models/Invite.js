const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');


class Invite extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    allowNull: false,
                    defaultValue: () => uuidv4(),
                },
                status: DataTypes.BOOLEAN,
                inviteToken: DataTypes.STRING,
                userId: DataTypes.INTEGER,
                groupId: DataTypes.INTEGER

            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.User);
        this.belongsTo(models.Group);
    }
}

module.exports = Invite;