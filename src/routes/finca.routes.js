import { Router } from "express";
import { getfinca, getfincas, postfinca, putfinca } from "../controllers/fincacontrollers.js";

const router = Router();

router.post('/finca',postfinca)
router.get('/finca/:id',getfinca)
router.get('/fincas',getfincas)
router.put('/finca/:id',putfinca)

export default router