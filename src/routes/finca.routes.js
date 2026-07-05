import { Router } from "express";
import { getfinca, getfincas, postfinca } from "../controllers/fincacontrollers.js";

const router = Router();

router.post('/finca',postfinca)
router.get('/finca/:id',getfinca)
router.get('/fincas',getfincas)

export default router