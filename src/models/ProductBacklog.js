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
        this.hasOne(models.Sprint);
        this.belongsTo(models.Group);
        this.hasOne(models.SprintBacklog);
    }
}

module.exports = ProductBacklog;