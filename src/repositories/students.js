const Student = require("../models/Student");

module.exports = {
    async findAllStudents() {
        const student = await Student.findAll();
        return student;
    },
    async findStudentByPk(userId) {
        const userImage = await Student.findByPk(userId);
        return userImage
    }
}