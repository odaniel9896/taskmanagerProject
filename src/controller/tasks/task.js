const Card = require("../../models/Card");
const Task = require("../../models/Task");

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
    },
    async delete(req, res) {
        const taskId = req.params.taskId;
        const cardId = req.params.cardId;

        try {
            const task = await Task.findByPk(taskId);
            console.log(task);

            if(!task)
                return res.status(404).send({ error: "Essa task não existe"});
            
            if(!task.cardId === cardId)
                return res.status(404).send({ error: "Não permitido"});

            await task.destroy();

            res.status(200).send()
        } catch (error) {
             console.log(error);
            res.status(500).send(error);
        }
    },
    async index(req, res) {
        const cardId = req.params.cardId;

        try {
            const card = await Card.findByPk(cardId);

            if(!card)
                return res.status(404).send({ error: "Card não encontrado"})

            const listCard = await card.getTasks({
                attributes: ["id", "task", "dueDate", "cardId", "createdAt", "updatedAt", "checked"]
            });
            
            res.send(listCard)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    async update(req, res) {
        const taskId = req.params.taskId

        try {
            const task = await Task.findByPk(taskId);

            if(!task)
                return res.status(404).send({ error: "Tarefa não encontrada"})

            if(task.checked === false)
                task.checked = true;
            else
                task.checked = false;
                
            task.save();
            
            res.send().status(200);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}