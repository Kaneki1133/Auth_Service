const validateUserAuth = (req , res , next) =>{
    if( !req.body.email || !req.body.password ){
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something is missing either email or password",
            err:"Email or password missing in the request",
        });
    }

    next();
}

const validateIsAdminRequest = (req , res , next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success:false,
            message: " Please Send the userId to Check Role",
            data: {},
            err:"userId is Missing from request body"
        });
    }
    next();
}

module.exports = {
    validateUserAuth,
    validateIsAdminRequest
}