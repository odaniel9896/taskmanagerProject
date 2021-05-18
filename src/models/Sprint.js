const { Model, DataTypes } = require("sequelize");

class Sprint extends Model {
    static init(sequelize) {
        super.init(
            {
                timeBox: DataTypes.DATE,
                storieId: DataTypes.INTEGER,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.DailyScrum);
        this.belongsTo(models.Storie);
    }
}

module.exports = Sprint;