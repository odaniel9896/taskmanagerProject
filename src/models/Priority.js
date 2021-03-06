const { Model, DataTypes } = require("sequelize");

class Priority extends Model {
    static init(sequelize) {
        super.init(
            {
                priority: DataTypes.STRING,           
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasMany(models.ProductBacklog);
        this.hasMany(models.Card);

    }
}

module.exports = Priority;