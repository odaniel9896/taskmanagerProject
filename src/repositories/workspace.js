const Workspace = require("../models/Workspace");

module.exports = {
    async findWorkspaceByPk(workspaceId) {
        const workspace = await Workspace.findByPk(workspaceId);

        return workspaceId
    }
}