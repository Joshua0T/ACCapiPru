import { Router } from "express";
import { getvariedadcafe, getvariedadescafe, postvariedadcafe } from "../controllers/variedadcafecontrollers.js";


const router = Router()

router.post('/variedadcafe',postvariedadcafe)
router.get('/variedaddecafe/:id',getvariedadcafe)
router.get('/variedadescafe',getvariedadescafe)
export default router