import { Router } from "express";
import { gethistorial, gethistoriales, posthistorial } from "../controllers/historialcontrollers.js"


const router = Router();

router.post('/historial',posthistorial)
router.get('/historial/:id',gethistorial)
router.get('/historiales',gethistoriales)

export default router