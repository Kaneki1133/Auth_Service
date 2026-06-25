const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const UserRepository = require(`../repository/user-repository`)

const { JWT_KEY } = require(`../config/serverConfig`);

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

    createToken(user){
        try {
            const result = jwt.sign( user, JWT_KEY , {expiresIn: `1h`});    //* this is the syntax jwt.sign(user , privateKeyFromEnvVariable , {expiresIn: `1h`} )
            return result;
        } catch (error) {
            console.log("Something Went Wrong in the Service Layer");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    checkPassword(userInputPassword , encryptedPassword){
        try {
            return bcrypt.compare(userInputPassword , encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

}

module.exports = UserServices;