const User = require("../models/User");

module.exports = {
    async findUserById(userId){
        const user = await User.findByPk(userId);

        return user;
    }
}