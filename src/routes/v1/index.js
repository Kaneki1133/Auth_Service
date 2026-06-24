const express = require(`express`);

const router = express.Router();

const UserController = require(`../../controllers/user-controllers`);

router.post(`/signup` , UserController.create);

router.delete(`/user/:id` , UserController.destroy);

module.exports = router;