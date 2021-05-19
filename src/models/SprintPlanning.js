const { Model, DataTypes } = require("sequelize");

class SprintPlanning extends Model {
    static init(sequelize) {
        super.init(
            {
                ata: DataTypes.STRING,
                sprintId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Sprint);
    }
}

module.exports = SprintPlanning;