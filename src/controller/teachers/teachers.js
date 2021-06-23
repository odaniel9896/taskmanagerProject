const { sendEmail, verifyEmail } = require("../../services/emailConfirmation.js");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const { createUserTeacher, findUserByEmail, findUserById } = require("../../repositories/user");
const { findTeacherByPk, findTeacherByUserId } = require("../../repositories/teacher.js");


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

            const createUser = await createUserTeacher(email, passwordCript, rand, passwordTokenCript);

            await createUser.createTeacher({
                name,
                id: createUser.id
            });
            const url = `https://tecnotcc.herokuapp.com/verify?confirmationCode=${rand}`

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
    },
    async find(req, res) {
        const { userId } = req;

        try {
            let teacher = await findTeacherByUserId(userId)

            //se aluno não encontrado, retornar not found
            if (!teacher)
                return res.status(404).send({ erro: "Aluno não encontrado" });

                res.send({
                    id : userId,
                    email : teacher.email,
                    role : teacher.role,
                    name : teacher.Teacher.name,
                    profileImage : teacher.Teacher.profileImage
                });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    },
    async update(req, res) {

        const { name, email, currentPassword, newPassword } = req.body;

        const { userId } = req;

        try {
            let user = await findUserById(userId);

            if (!user)
                return res.status(400).send({ error: "User não encontrado" });

            if (currentPassword) {
                if (!bcrypt.compareSync(currentPassword, user.password))
                    return res.status(403).send({ error: "Sua senha atual está errada" });

                let teacher = await findTeacherByPk(userId);

                teacher.name = name;

                teacher.email = email;
                teacher.password = newPassword;

                teacher.save();
                res.status(200).send();

            }
            else {
                let teacher = await findTeacherByPk(userId);

                teacher.name = name ;

                teacher.email = email;
                teacher.password = newPassword;

                teacher.save();
                res.status(200).send();
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}