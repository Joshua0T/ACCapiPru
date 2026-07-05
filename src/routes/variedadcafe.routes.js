import { Router } from "express";
import { getvariedadcafe, postvariedadcafe } from "../controllers/variedadcafecontrollers.js";


const router = Router()

router.post('/variedadcafe',postvariedadcafe)
router.get('/variedaddecafe/:id',getvariedadcafe)
export default router