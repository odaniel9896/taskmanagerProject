const Workspace = require("../../models/Workspace");
const { feedCard } = require("../../repositories/feed");
const { findWorkspaceByPk } = require("../../repositories/workspace");

module.exports = {
    async index(req, res) {
        const workspaceId = req.params.workspaceId

        try {
            const workspace = await findWorkspaceByPk(workspaceId);
            
            if (!workspace)
                return res.status(404).send({ error: "Workspace não encontrado" });

            const feed = await feedCard(workspaceId);

            res.send(feed)
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}