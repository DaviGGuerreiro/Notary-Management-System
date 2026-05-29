import { Router } from "express";
import userRouter from "./user.routes";
import serviceRouter from "./notaryservice.routes";

const router = Router();

router.use('/users', userRouter);
router.use('/services', serviceRouter);

export default router;