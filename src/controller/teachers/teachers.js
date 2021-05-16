const { sendEmail, verifyEmail } = require("../../services/emailConfirmation.js");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const { createUserTeacher, findUserByEmail } = require("../../repositories/user");


module.exports = {
    async store(req, res) {

        const { name, email, password } = req.body;

        try {
            let teacher = await findUserByEmail(email)
            
            if (teacher)
                return res.status(400).send({ error: "Email já cadastrado no sistema" });

            const rand = randomstring.generate(120);
            const passwordToken = randomstring.generate(240);   

            const passwordCript = bcrypt.hashSync(password);
            const passwordTokenCript = bcrypt.hashSync(passwordToken)

            const createUser = await createUserTeacher(email, passwordCript, passwordTokenCript, rand);

            await createUser.createTeacher({
                name,
                id: createUser.id
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