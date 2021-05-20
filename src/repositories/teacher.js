const Teacher = require("../models/Teacher");
const User = require("../models/User");

module.exports = {
    async findAllTeacher() {
        const teacher = await Teacher.findAll();
        return teacher;
    },
    async findTeacherByPk(userId) {
        const teacherImage = await Teacher.findByPk(userId);
        return teacherImage
    },
    async findTeacherByUserId(userId) {
        const teacher = await User.findByPk(userId, {
            attributes: ["id", "email", "role"],
            include: [
                {
                    association: "Teacher",
                    attributes: ["name", "profileImage"]
                }
            ]
        });

        return teacher;
    }
}