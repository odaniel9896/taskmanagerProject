const Teacher = require("../../models/Teacher");
const Student = require("../../models/Student");
const { findStudentByPk } = require("../../repositories/students");

module.exports = {

    async store(req, res) {
        const { firebaseUrl } = req.file;

        const {groupid} = req.body;


        if (!firebaseUrl)
            return res.status(404).send({ error: "Campo imagem é obrigatorio" });

        try {

            const groupImage = await findGroupById(groupid);

            groupImage.image = firebaseUrl;

            groupImage.save();

            res.status(201).send({
                groupid,
                image: firebaseUrl,
            })

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}