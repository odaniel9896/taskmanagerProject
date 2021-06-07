const Question = require("../../models/Question");

module.exports = {
  //função que adiciona uma respota a uma pergunta
  async store(req, res) {
    const questionId = req.params.questionId;

    const { userId } = req;

    const { description } = req.body;

    try {

      //verifica se a questão existe
      const question = await Question.findByPk(questionId);

      //se não existir retorna erro 404
      if (!question)
        return res.status(404).send({ error: "Pergunta não encontrada" });

      //cria a resposta para a pergunta com o aluno do token
      const answer = await question.createAnswer({ description, userId: userId });

      //responde com status de sucesso
      res.status(201).send(answer);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }

  },
}