const { Op } = require("sequelize");
const Question = require("../../models/Question");
const { findUserById } = require("../../repositories/user");

module.exports = {
  async index(req, res) {
    const { search } = req.query;

    try {
      const questions = await Question.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.substring]: search,
              },
            },
            {
              description: {
                [Op.substring]: search,
              },
            },
          ],
        },
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
      });
      console.log(questions)
      res.send(questions);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);console.log(error)
    }
  },
  async store(req, res) {
    const { title, description } = req.body;

    const { userId } = req;

    try {
      //buscar o aluno pelo ID
      const user = await findUserById(userId);
      //se aluno não existir, retorna erro
      if (!user) return res.status(404).send({ error: "User não encontrado" });

      //crio a pergunta para o aluno
      let question = await user.createQuestion({
        title,
        description,
        image: req.file ? req.file.firebaseUrl : null,
      });

      //retorno sucesso
      res.status(201).send({
        id: question.id,
        title: question.title,
        description: question.description,
        created_at: question.created_at,
        image: req.file ? req.file.firebaseUrl : null,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async update(req, res) {
    const questionId = req.params.questionId;

    const { title, description } = req.body;

    const { userId } = req;

    try {
      const question = await Question.findByPk(questionId);

      if (!question)
        return res.status(404).send({ error: "Questão não encontrada" });

      if (question.UserId !== userId)
        return res.status(401).send({ error: "Não autorizado" });

      question.title = title;
      question.description = description;

      question.save();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const questionId = req.params.questionId;

    const { userId } = req;

    try {
      const question = await Question.findOne({
        where: {
          id: questionId,
          userId: userId,
        },
      });

      if (!question) res.status(404).send({ error: "Questão não encontrada" });

      await question.destroy();

      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
