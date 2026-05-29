import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

const userController = new UserController();

router.route('/')
    .get(userController.getAll)
    .post(userController.create);

router.route('/:id')
    .get(userController.getById)
    .patch(userController.update)
    .put(userController.replace)
    .delete(userController.delete);

router.route('/login').post(userController.login);

export default router;