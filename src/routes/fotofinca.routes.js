import { Router } from "express";
import { getfotofinca, getfotofincas, postfotofinca } from "../controllers/fotofincacontrollers.js";
import { getfinca } from "../controllers/fincacontrollers.js";

const router = Router()

router.post('/fotofinca',postfotofinca)
router.get('/fotofinca/:id',getfotofinca)
router.get('/fotofincas',getfotofincas)

export default router