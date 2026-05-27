import { Router } from "express";
import { getUsersController, getUserByIdController } from "../controllers/user.controller";

const router = Router();

router.route("/")
    .get(getUsersController);

router.route("/:id")
    .get(getUserByIdController)
    .post()
    .delete()
    .patch()
    .put();

export default router;