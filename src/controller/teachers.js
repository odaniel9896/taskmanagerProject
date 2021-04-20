const Teacher = require("../models/Teacher");
const { sendEmail, verifyEmail } = require("../services/emailConfirmation.js");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");


module.exports = {
    async store(req, res) {

        const { name, email, password } = req.body;

        try {
            let teacher = await User.findOne({
                where: {
                    email: email,
                },
            });
            if (teacher)
                return res.status(400).send({ error: "Email já cadastrado no sistema" });

            const rand = randomstring.generate(120)

            const passwordCript = bcrypt.hashSync(password);

            const createUser = await User.create({
                email,
                password: passwordCript,
                role: "teacher",
                confirmationCode: rand
            });
            const createTeacher = await Teacher.create({
                name,
                userId: createUser.id
            });
            const url = `http://localhost:3333/verify?confirmationCode=${rand}`

            sendEmail(
                email,
                url
            )
            res.status(201).send({
                teacher: {
                    teacherId: createUser.id,
                    email: createUser.email,
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}