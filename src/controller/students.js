
const { sendEmail, verifyEmail } = require("../services/emailConfirmation.js");
const Student = require("../models/Student");
const { generateToken } = require("../utils");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

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
            let student = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (student)
                return res.status(400).send({ error: "Email já cadastrado no sistema" });

            const passwordCript = bcrypt.hashSync(password);

            const createUser = await User.create({
                email,
                password: passwordCript
            });

            let createStundent = await User.createStudent({
                name,
                userId: createUser.id
            });
       

            sendEmail(
                email
            )
            res.status(201).send({
                student: {
                    studentId: createUser.id,
                    email: createUser.email,
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}