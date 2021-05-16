const Annotation = require("../models/Annotation");

module.exports = {
    async findAllAnnotations(userId) {
        const annotation = await Annotation.findAll({
            where: {
                userId: userId
            },
            attributes: [
                "id",
                "text",
                "createdAt",
                "userId"
            ],
            order: [["createdAt", "DESC"]]
        });

        return annotation;
    },
    async createAnnotation(text, user) {
        const createAnnotation = await user.createAnnotation({
            text: text,
        }); 

        return createAnnotation
    },
    async findOneAnnotation(annotationId) {
        const annotation = await Annotation.findOne({
            where: {
                id : annotationId
            }
        });
        return annotation;
    }
}