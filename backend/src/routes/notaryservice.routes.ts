import { Router } from "express";
import { } from "../controllers/notaryservice.controller";

const router = Router();

router.route("/")
    .get()

router.route("/:id")
    .get()
    .post()
    .delete()
    .patch()
    .put()

export default router;