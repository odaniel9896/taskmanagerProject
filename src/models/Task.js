const { Model, DataTypes } = require("sequelize");

class Task extends Model {
    static init(sequelize) {
        super.init(
            {
                task: DataTypes.STRING,
                dueDate: DataTypes.DATE,
                cardId: DataTypes.INTEGER            
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        this.belongsTo(models.Card);
    }
}

module.exports = Task;