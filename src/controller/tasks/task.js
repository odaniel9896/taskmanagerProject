const Card = require("../../models/Card");

module.exports = {
    async store(req, res) {
        const cardId = req.params.cardId;

        const {task, dueDate} = req.body;

        try {
            const card = await Card.findByPk(cardId);

            if(!card)
                return res.status(404).send({ error: "Card não encontrado"});
            
            const createTasks = await card.createTask({
                task : task,
                dueDate : dueDate
            });
            
            res.send(createTasks).status(201)
                
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}