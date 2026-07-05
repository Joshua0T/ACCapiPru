import { Router } from "express";
import { getdocumento, getdocumentos, postdocumento } from "../controllers/documentoeudrcontrollers.js";


const router = Router()

router.post('/documento',postdocumento)
router.get('/documento/:id',getdocumento)
router.get('/documentos',getdocumentos)

export default router