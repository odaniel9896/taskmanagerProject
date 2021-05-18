const { Model, DataTypes } = require("sequelize");

class ProductBacklog extends Model {
    static init(sequelize) {
        super.init(
            {
                description: DataTypes.STRING,
                groupId: DataTypes.INTEGER
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.SprintPlanning);
        // VERIFICAR SE É HASMANY
        this.belongsTo(models.Group);
    }
}

module.exports = ProductBacklog;