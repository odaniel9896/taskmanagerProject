const User = require("../models/User");

module.exports = {
    async findUserById(userId) {
        const user = await User.findByPk(userId);

        return user;
    },
    async findUserByEmail(email) {
        let student = await User.findOne({
            where: {
                email: email,
            },
        });
        return student
    },
    async createUserStudent(email, passwordCript, rand, passwordTokenCript) {
        const createUser = await User.create({
            email : email,
            password: passwordCript,
            role: "student",
            confirmationCode: rand,
            passwordToken: passwordTokenCript
        });

        return createUser;
    },
    async createUserTeacher(email, passwordCript, rand, passwordTokenCript) {
        const createUser = await User.create({
            email : email,
            password: passwordCript,
            role: "teacher",
            confirmationCode: rand,
            passwordToken: passwordTokenCript
        });

        return createUser;
    },
    async createInvite(groupId, tokenInvite) {
        const createInvite = await User.createInvite({
            groupId: groupId,
            inviteToken: tokenInvite
        });
        return createInvite
    }
}