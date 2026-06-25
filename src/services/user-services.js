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
            //* this is the syntax jwt.sign(user , privateKeyFromEnvVariable , {expiresIn: `1h`} )
            const result = jwt.sign( user, JWT_KEY , {expiresIn: '1h'});    
            return result;
        } catch (error) {
            console.log("Something Went Wrong in Token Creation");
            throw error;
        }
    }

    verifyToken(token){
        try {
            const response = jwt.verify(token , JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in Token Validation ",error);
            throw error;
        }
    }

    checkPassword(userInputPassword , encryptedPassword){
        try {
            return bcrypt.compareSync(userInputPassword , encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in Password Comparision ");
            throw error;
        }
    }

    async signIn(email , plainPassword){
        try {

            //* Fetch User Object through email
            const user = await this.userRepository.getByEmail(email);                   
            
            //*compare incoming plain Password with stored encrypted Password
            const passwordMatch = this.checkPassword(plainPassword , user.password);    

            if(!passwordMatch){
                console.log("Password doesn't match");
                throw { error:"Incorrect Password" };
            }

            //*if password match then create a token and send it to user
            const newJWT = this.createToken({email:user.email , id:user.id}); 

            return newJWT;

        } catch (error) {
            console.log("Something Went Wrong in The SignIn Process");
            throw error;
        }
    }

}

module.exports = UserServices;