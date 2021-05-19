const { Model, DataTypes } = require("sequelize");

class ProductBacklog extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                groupId: DataTypes.INTEGER,
                priority: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.Sprint, {foreignKey: "storieId"});
        this.belongsTo(models.Group);
        this.hasOne(models.SprintBacklog);
    }
}

module.exports = ProductBacklog;