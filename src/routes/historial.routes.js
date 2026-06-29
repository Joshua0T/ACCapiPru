import { Router } from "express";
import { posthistorial } from "../controllers/historialcontrollers.js"


const router = Router();

router.post('/historial',posthistorial)

export default router