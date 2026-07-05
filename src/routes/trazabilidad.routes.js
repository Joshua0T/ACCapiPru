import { Router } from "express";
import { gettrazabilidad, posttrazabilidad } from "../controllers/trazabilidadeudrcontrollers.js";

export const router = Router()

router.post('/trazabilidad',posttrazabilidad)
router.get('/trazabilidad/:id',gettrazabilidad)

export default router