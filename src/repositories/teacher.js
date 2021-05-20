const Teacher = require("../models/Teacher");

module.exports = {
    async findAllTeacher() {
        const teacher = await Teacher.findAll();
        return teacher;
    },
    async findTeacherByPk(userId) {
        const teacherImage = await Teacher.findByPk(userId);
        return teacherImage
    }
}