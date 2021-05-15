const Annotation = require("../../models/Annotation");
const User = require("../../models/User");

module.exports = {
    async index(req, res) {
        const { userId } = req;

        try {
            const user = await User.findByPk(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const annotation = await Annotation.findAll({
                where: {
                    userId: user.id,
                },
                attributes: [
                    "id",
                    "text",
                    "createdAt",
                    "userId"
                ],
                order: [["createdAt", "DESC"]]
            });
            res.send(annotation);

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async store(req, res) {

        const { userId } = req;

        const { text } = req.body;

        try {
            const user = await User.findByPk(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const createAnnotation = await user.createAnnotation({
                text: text,
            });

            res.status(201).send(createAnnotation)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        const annotationId = req.params.id;

        const { userId } = req;

        try {
            const annotation = await Annotation.findOne({
                id: annotationId,
                userId: userId
            });
            if (!annotation)
                return res.status(404).send({ error: "Anotação não encontrada" });

            if (annotation.userId != userId)
                return res.status(404).send({ error: "Não permitido" });

            await annotation.destroy();

            res.status(200).send();
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async update(req, res) {
        const annotationId = req.params.id;

        const { userId } = req;

        const { text } = req.body;

        try {
            const annotation = await Annotation.findOne({
                where: {
                    id: annotationId,
                    userId: userId
                }
            });
            if (!annotation)
                return res.status(404).send({ error: "Anotação não encontrada" });

            if (annotation.userId != userId)
                return res.status(404).send({ error: "Não permitido" });

            annotation.text = text;

            annotation.save();
            
            res.status(200).send({
                    id: annotation.id,
                    text: annotation.text
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}