
const {sendEmail} = require("../middleware/emailConfirmation");
const Student = require("../models/Student");
const { generateToken } = require("../utils");

module.exports = {
    async store(req, res) {
        const { name, email, password } = req.body;
        try {
            let student = await Student.findOne({
                where: {
                    email: email,
                },
            });
            if (student)
                return res.status(400).send({ error: "Email já cadastrado no sistema" });

            student = await Student.create({
                name,
                email,
                password,
            });
            sendEmail(
                email
            )
            //sendEmail(email)

            const token = generateToken({
                studentId: student.id,
                studentName: student.name,
            });


            res.status(201).send({
                student: {
                    studentId: student.id,
                    name: student.name,
                    email: student.email,
                },
                token
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
    
}