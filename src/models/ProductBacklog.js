const { Model, DataTypes } = require("sequelize");

class ProductBacklog extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                groupId: DataTypes.INTEGER,
                sprintId: DataTypes.INTEGER,
                priorityId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Sprint);
        this.belongsTo(models.Group);
        this.hasOne(models.Card, {foreignKey: "storieId"});
        this.belongsTo(models.Priority)
    }
}

module.exports = ProductBacklog;