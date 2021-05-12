const { Model, DataTypes } = require("sequelize");

class List extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                order: DataTypes.INTEGER,
                workspaceId: DataTypes.INTEGER,              
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Workspace);
        this.hasOne(models.Card);

    }
}

module.exports = List;