const Student = require("../models/Student");

module.exports = {
    async findAllStudents() {
        const student = await Student.findAll();
        return student;
    }
}