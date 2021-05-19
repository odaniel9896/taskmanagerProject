const { Model, DataTypes } = require("sequelize");

class SprintBacklog extends Model {
    static init(sequelize) {
        super.init(
            {
                productBacklogId: DataTypes.INTEGER,
                sprintId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Sprint);
        this.belongsTo(models.ProductBacklog);
        //VERIFICAR SE É HASMANY
    }
}

module.exports = SprintBacklog;