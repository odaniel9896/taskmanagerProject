const { Model, DataTypes } = require("sequelize");

class Friend extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsToMany(models.User, { through: "userFriend" });
    }
}

module.exports = Friend;