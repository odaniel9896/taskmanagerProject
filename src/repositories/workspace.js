const Workspace = require("../models/Workspace");

module.exports = {
    async findWorkspaceByPk(workspaceId) {
        const workspace = await Workspace.findByPk(workspaceId);

        return workspaceId
    },
    async createListsForWorkspace(group, name) {
        const workspace = await group.createWorkspace({
            name: name ? name : "Workspace"
        });

        await workspace.createList({
            name: "Backlog",
            order: 1
        })

        await workspace.createList({
            name: "Em desenvolvimento",
            order: 2
        })

        await workspace.createList({
            name: "Em testes",
            order: 3
        })

        await workspace.createList({
            name: "Em Analise",
            order: 4
        })

        await workspace.createList({
            name: "Concluido",
            order: 5
        })
        return workspace;

    }
}