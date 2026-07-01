const { StatusCodes } = require("http-status-codes");
const { User , Role } = require(`../models/index`);
const ValidationError  = require(`../utils/validation-error`);
const ClientError = require(`../utils/client-error`);

class UserRepository{

    async create(data){
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
                if(error.name == `SequelizeValidationError`){
                    throw new ValidationError(error);

                }
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

            if(!user){
                throw new ClientError(
                    `EmailNotFound`,
                    'Invalid Email Sent in the Request',
                    'Please Check the Email , as No record',
                    StatusCodes.NOT_FOUND
                )
            }

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