const express = require(`express`);

const router = express.Router();

const UserController = require(`../../controllers/user-controllers`);

const { AuthRequestValidator } = require(`../../middlewares/index`);

router.post(
    `/signup` , 
    AuthRequestValidator.validateUserAuth, 
    UserController.create
);

router.delete(`/user/:id` , UserController.destroy);

router.post(
    `/signin` , 
    AuthRequestValidator.validateUserAuth,
    UserController.signIn
);

module.exports = router;