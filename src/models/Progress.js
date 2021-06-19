const { Model, DataTypes } = require("sequelize");

class Progress extends Model {
    static init(sequelize) {
        super.init(
            {
                progress: DataTypes.STRING,           
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasMany(models.Card);
    }
}

module.exports = Progress;