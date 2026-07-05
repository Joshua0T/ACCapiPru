import { Router } from "express";
import { getcodigoqr, getcodigosqr, postcodigoqr } from "../controllers/codigoqrcontrollers.js";


const router = Router()

router.post('/codigoqr',postcodigoqr)
router.get('/codigoqr/:id',getcodigoqr)
router.get('/codigosqr',getcodigosqr)

export default router