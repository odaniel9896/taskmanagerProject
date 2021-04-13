
const { sendEmail, verifyEmail } = require("./emailConfirmation");
const Student = require("../models/Student");
const { generateToken } = require("../utils");
const bcrypt = require("bcryptjs");

module.exports = {
    async index(req, res) {
        try {
            const student = await Student.findAll();

            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
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

            const passwordCript = bcrypt.hashSync(password);

            student = await Student.create({
                name,
                email,
                password: passwordCript,
            });
            sendEmail(
                email
            )
            res.status(201).send({
                student: {
                    studentId: student.id,
                    name: student.name,
                    email: student.email,
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}