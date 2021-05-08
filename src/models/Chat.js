const { Model, DataTypes } = require("sequelize");

class Chat extends Model {
    static init(sequelize) {
        super.init(
            {
                room: DataTypes.STRING,
                groupId: DataTypes.INTEGER       
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsToMany(models.User, { through: "userChat" });
        this.hasOne(models.Message);
        this.hasOne(models.Group, { foreignKey: "id" });
    }
}

module.exports = Chat;