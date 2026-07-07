import { Router } from "express";
import { gettrazabilidad, gettrazabilidades, posttrazabilidad } from "../controllers/trazabilidadeudrcontrollers.js";

export const router = Router()

router.post('/trazabilidad',posttrazabilidad)
router.get('/trazabilidad/:id',gettrazabilidad)
router.get('/trazabilidades',gettrazabilidades)

export default router