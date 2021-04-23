const { Model, DataTypes } = require("sequelize");

class Invite extends Model {
    static init(sequelize) {
        super.init(
            {
                status: DataTypes.BOOLEAN,
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