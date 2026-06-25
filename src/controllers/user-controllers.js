const UserServices = require(`../services/user-services`);

const userServices = new UserServices();

const create = async (req , res) => {
    try {
        const response = await userServices.create({
            email: req.body.email,
            password: req.body.password
        });

        return res.status(201).json({
            success:true,
            message:"SuccessFully Created a new User",
            data: response,
            err: {},
        })
    } catch (error) {
        console.log("Something went wrong in the controller layer");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Went Wrong",
            data: {},
            err : error,
        })
    }
}

const destroy = async ( req, res ) => {
    try {
        const response = await userServices.destroy(req.params.id);
        return res.status(200).json({
            success: true,
            message: "SuccessFully Deleted a User",
            data: response,
            err: {},
        });
    } catch (error) {
        console.log("Something Went Wrong in the Controller Layer");
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something Went Wrong",
            data: {},
            err : error,
        });
    }
}

const signIn = async ( req, res ) =>{
    try {
        const response = await userServices.signIn(req.body.email , req.body.password);
        return res.status(200).json({
            success:true,
            message: "SuccessFully SignedIn",
            data:response,
            err: {},
        });
    } catch (error) {
        console.log("Something Went wrong in the controller layer SignIn Function");
        return res.status(500).json({
            success: false,
            message: "Something went wrong in Controller SignIn Process",  
            data: {},
            err: error,
        })
    }
}

const isAuthenticated = async ( req, res ) =>{
    try {
        const token = req.headers['x-access-token'];
        const result = await userServices.isAuthenticated(token);

        return res.status(200).json({
            success:true,
            err: {},
            data: result,
            message: "User is Authenticated and token is valid" 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: " Something Went Wrong While Authenticating from Controller isAuthenticate ",
            data: {},
            success: false,
            err:error 
        })
    }
}

module.exports = {
    create,
    destroy,
    signIn,
    isAuthenticated,
}