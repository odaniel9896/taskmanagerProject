const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const { findStudentByPk } = require("../../repositories/students");

module.exports = {

    async store(req, res) {
        const { firebaseUrl } = req.file;

        const { userId, userRole } = req;


        if (!firebaseUrl)
            return res.status(404).send({ error: "Campo imagem é obrigatorio" });

        try {
            let userUpdate;

            if(userRole == "teacher")
                userUpdate = Teacher
            else
                userUpdate = Student    

            const userImage = await userUpdate.findByPk(userId);

            userImage.profileImage = firebaseUrl;

            userImage.save();

            res.status(201).send({
                userId,
                image: firebaseUrl,
            })

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}