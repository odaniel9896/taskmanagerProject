const Teacher = require("../models/Teacher");

module.exports = {
    async store(req, res) {
        
        const { name, email, password } = req.body;

        try {
            let teacher = await Teacher.findOne({
                where: {
                    email: email,
                },
            });
            if (teacher)
                return res.status(400).send({ error: "Email de professor já cadastrado no sistema" });

            const passwordCript = bcrypt.hashSync(password);

            teacher = await Teacher.create({
                name,
                email,
                password: passwordCript,
            });
            res.status(201).send({
                teacher: {
                    teacherId: teacher.id,
                    name: teacher.name,
                    email: teacher.email,
                }
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
}