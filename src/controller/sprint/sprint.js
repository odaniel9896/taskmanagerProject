const ProductBacklog = require("../../models/ProductBacklog");

module.exports = {
    async store(req, res) {
        const storieId = req.params.storieId;

        try {
            const storie = await ProductBacklog.findByPk(storieId);

            if (!storie)
                return res.status(404).send({ error: "História não encontrada" })
                
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
}