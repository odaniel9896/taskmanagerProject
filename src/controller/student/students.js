const { sendEmail, verifyEmail } = require("../../services/emailConfirmation.js");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const { findUserByEmail, createUserStudent } = require("../../repositories/user.js");
const { findAllStudents } = require("../../repositories/students.js");

module.exports = {
    async index(req, res) {
        try {
            const student = await findAllStudents()

            res.send(student);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async store(req, res) {

        const { name, email, password } = req.body;

        try {
            let student = await findUserByEmail(email);

            if (student)
                return res.status(400).send({ error: "Email já cadastrado no sistema" });

            const rand = randomstring.generate(120);
            const passwordToken = randomstring.generate(240);

            const passwordCript = bcrypt.hashSync(password);
            const passwordTokenCript = bcrypt.hashSync(passwordToken)

            const createUser = await createUserStudent(email, passwordCript, rand, passwordTokenCript);

            await createUser.createStudent({
                name,
                id: createUser.id
            });

            const url = `http://localhost:3333/verify?confirmationCode=${rand}`

            sendEmail(
                email,
                url
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