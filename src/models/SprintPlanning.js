const { Model, DataTypes } = require("sequelize");

class SprintPlanning extends Model {
    static init(sequelize) {
        super.init(
            {
                tasksId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.Storie);
        this.belongsTo(models.ProductBacklog);

        //ALTERAR PARA HASMANY
    }
}

module.exports = SprintPlanning;