import { Router } from "express";
import { getcodigoqr, getcodigosqr, postcodigoqr, putcodigoqr } from "../controllers/codigoqrcontrollers.js";


const router = Router()

router.post('/codigoqr',postcodigoqr)
router.get('/codigoqr/:id',getcodigoqr)
router.get('/codigosqr',getcodigosqr)
router.put('/codigoqr/:id',putcodigoqr)

export default router