const { Model, DataTypes } = require("sequelize");

class Sprint extends Model {
    static init(sequelize) {
        super.init(
            {
                timeBox: DataTypes.DATE,
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.hasOne(models.DailyScrum);
        this.hasOne(models.SprintReview);
        this.hasOne(models.SprintRetrospective);
        this.hasOne(models.SprintPlanning);
        this.hasOne(models.ProductBacklog);
    }
}

module.exports = Sprint;