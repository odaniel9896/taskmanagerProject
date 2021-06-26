const { sendEmail, verifyEmail } = require("../../services/emailConfirmation.js");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const { findUserByEmail, createUserStudent, findUserById } = require("../../repositories/user.js");
const { findAllStudents, findStudentByPk, findStudentByUserId } = require("../../repositories/students.js");
const Student = require("../../models/Student.js");
const User = require("../../models/User.js");

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

            const url = `https://tecnotcc.herokuapp.com/verify?confirmationCode=${rand}`

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
    },
    async find(req, res) {
        const { userId } = req;

        try {
            let student = await findStudentByUserId(userId)

            //se aluno não encontrado, retornar not found
            if (!student)
                return res.status(404).send({ erro: "Aluno não encontrado" });

            res.send({
                id : userId,
                email : student.email,
                role : student.role,
                name : student.Student.name,
                profileImage : student.Student.profileImage
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

                let student = await findStudentByPk(userId);

                if(name) 
                    student.name = name;

                if(email)
                    user.email = email;
                
                if(newPassword)    
                    user.password = newPassword;

                student.save();
                user.save();
                res.status(200).send();
            }
            else {
                let student = await findStudentByPk(userId);

                if(name) 
                    student.name = name;

                if(email)  
                    user.email = email;
                
                student.save();
                user.save();
                res.status(200).send();
            }
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }

}