const { User , Role } = require(`../models/index`);

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
                console.log("Something went wrong in Repository Layer");
                throw error;
        }
    }

    async destroy(userId){
        try {
            await User.destroy({
                where:{
                    id: userId,
                }
            });
            return true;
        } catch (error) {
            console.log("Something Went Wrong in The Repository layer");
            throw error;
        }
    }

    async getById(userId){
        try {
            const user = await User.findByPk(userId , {
                attributes: [ `email` , `id` ],
            });
            return user;
        } catch (error) {
            console.log("Something Went Wrong in The Repository layer");
            throw error;
        }
    }

    async getByEmail(userEmail){
        try {
            const user = await User.findOne({
                where: {
                    email : userEmail,
                }
            });
            return user;
        } catch (error) {
            console.log("Something Went Wrong in the Repository Layer");
            throw error;
        }
    }

    async isAdmin(userId){
        try {
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where:{
                    name: 'ADMIN'
                }
            });
            const response = await user.hasRole(adminRole);
            console.log(`So Our User: ${user.dataValues.email} has Role: ${adminRole.dataValues.name} is ${response}`)
            return response; 

        } catch (error) {
            console.log("Something Went wrong in the repo layer");
            throw error;
        }
    }
}

module.exports = UserRepository;