const { Model, DataTypes } = require("sequelize");

class School extends Model {
    static init(sequelize) {
        super.init(
            {
                name: DataTypes.STRING,
                cep: DataTypes.STRING,
                district: DataTypes.STRING,
                street: DataTypes.STRING,
                number: DataTypes.INTEGER         
            },
            {
                sequelize,
            }
        )
    }
    static associate(models) {
        //REALIZAR OS ASSOCIATE
        this.belongsToMany(models.Teacher, { through: "teacherSchool" });
    }
}

module.exports = School;