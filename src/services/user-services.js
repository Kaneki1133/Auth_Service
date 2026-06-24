const UserRepository = require(`../repository/user-repository`)

class UserServices{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something Went Wrong in the Service layer");
            throw error;
        }
    }

    async destroy(userId)
    {
        try {
            const response = await this.userRepository.destroy(userId);
            return response;
        } catch (error) {
            console.log("Something Went Wrong in the Service Layer");
            throw error;
        }
    }

}

module.exports = UserServices;