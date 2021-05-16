const Annotation = require("../../models/Annotation");
const User = require("../../models/User");
const { findAllAnnotations, createAnnotation, findOneAnnotation } = require("../../repositories/annotations");
const { findUserById } = require("../../repositories/user");

module.exports = {
    async index(req, res) {
        const { userId } = req;

        try {
            const user = await findUserById(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const annotation = await findAllAnnotations(userId)

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
            const user = await findUserById(userId);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" });

            const createAnnotationA = await createAnnotation(text, user)

            res.status(201).send(createAnnotationA)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async delete(req, res) {
        const annotationId = req.params.id;
        const { userId } = req;

        try {
            const annotation = await findOneAnnotation(annotationId);

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
            const annotation = await findOneAnnotation(annotationId);

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