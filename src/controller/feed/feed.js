const Question = require("../../models/Question");
const { feedCard } = require("../../repositories/feed");
const { findWorkspaceByPk } = require("../../repositories/workspace");

module.exports = {
  async index(req, res) {
    const workspaceId = req.params.workspaceId;

    try {
      const workspace = await findWorkspaceByPk(workspaceId);

      if (!workspace)
        return res.status(404).send({ error: "Workspace não encontrado" });

      const feed = await feedCard(workspaceId);

      res.send(feed);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async indexQuestion(req, res) {
    const { page } = req.query;

    try {
      const totalQuestion = await Question.count();

      const feed = await Question.findAll({
        attributes: [
          "id",
          "title",
          "description",
          "image",
          "createdAt",
          "UserId",
        ],
        include: [
          {
            association: "User",
            attributes: ["id", "role"],
            include: [
              {
                association: "Student",
                attributes: ["name", "profileImage"],
              },
            ],
          },
          {
            association: "Answers",
            attributes: ["id", "description", "createdAt"],
            include: {
              association: "User",
              attributes: ["id", "role"],
              include: [
                {
                  association: "Student",
                  attributes: ["name", "profileImage"],
                },
              ],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
        limit: page ? [(page - 1) * 5, 5] : undefined,
      });

      res.header("X-Total-Count", totalQuestion);
      res.header("Access-Control-Expose-Headers", "X-Total-Count");

      res.send(feed);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
