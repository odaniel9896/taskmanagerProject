const { Model, DataTypes } = require("sequelize");

class Storie extends Model {
    static init(sequelize) {
        super.init(
            {
                storie: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.Sprint);
        this.belongsTo(models.SprintPlanning);
        //VERIFICAR SE É HASMANY
    }
}

module.exports = Storie;