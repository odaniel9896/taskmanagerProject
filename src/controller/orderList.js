const List = require("../models/List");
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');

module.exports = {
    async update(req, res) {

        const listId = req.params.listId;
        const workspaceId = req.params.listId;
        const { order } = req.body;

        try {
            const list = await List.findByPk(listId, {
                attributes: ["id", "name", "order", "workspaceId"],
                where: {
                    workspaceId: workspaceId
                },
            })
            if (!list)
                return res.status(404).send({ error: "Lista não encontrada" });
 
            if (order > list.order) {
                const teste = await List.update(
                    { 
                        order: `order` - 1
                        
                    },
                    {
                        where: {
                            order: {
                                [Op.between]: [list.order + 1, order]
                            }
                        }
                    }
                )
                   console.log(teste)
                // const teste2 = await List.update(
                //     {
                //         order: position
                //     },
                //     {
                //         where: {
                //             id : listId
                //         }
                //     }
                // )
                
                res.send("teste")
            }
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

        //select * from cards order by `order` asc

        // update cards set`order` = 4
        // where id = 145;

        // update cards set`order` = `order` - 1
        // where`order` between 3 and 4;

    }
}