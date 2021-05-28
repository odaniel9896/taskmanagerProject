const { Model, DataTypes } = require("sequelize");

class Workspace extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                backgroundImage: DataTypes.STRING,
                groupId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasMany(models.List);
        this.belongsTo(models.Group);
    }
}

module.exports = Workspace;