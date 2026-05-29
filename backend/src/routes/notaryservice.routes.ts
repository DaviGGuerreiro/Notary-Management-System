import { Router } from "express";
import { NotaryserviceController } from "../controllers/notaryservice.controller";

const router = Router();
const notaryController = new NotaryserviceController();

router.route('/')
    .get(notaryController.getAll)
    .post(notaryController.create);

router.route('/cpf/:cpf')
    .get(notaryController.getByCpf);

router.route('/:id')
    .get(notaryController.getById)
    .patch(notaryController.patch)
    .put(notaryController.replace)
    .delete(notaryController.delete);

router.route('/:id/status')
    .patch(notaryController.updateStatus);

export default router;