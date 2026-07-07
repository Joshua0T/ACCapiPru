import { Router } from "express";
import { getdocumento, getdocumentos, postdocumento, putdocumento } from "../controllers/documentoeudrcontrollers.js";


const router = Router()

router.post('/documento',postdocumento)
router.get('/documento/:id',getdocumento)
router.get('/documentos',getdocumentos)
router.put('/documento/:id',putdocumento)


export default router