const Student = require("../models/Student");
const User = require("../models/User");

module.exports = {
    async findAllStudents() {
        const student = await Student.findAll();
        return student;
    },
    async findStudentByPk(userId) {
        const userImage = await Student.findByPk(userId);
        return userImage
    },
    async findStudentByUserId(userId) {
        const student = await User.findByPk(userId, {
            attributes: ["id", "email", "role"],
            include: [
                {
                    association: "Student",
                    attributes: ["name", "profileImage"]
                }
            ]
        });

        return student;
    }
}