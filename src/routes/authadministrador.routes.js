import {Router} from "express";
import{getadministrador,
       getadministradores,
       postadministrador,
       putadministrador,
       deleteadministrador} from '../controllers/authadministradorcontrollers.js'
import { verificarIP } from "../middleware/middleware.js";




const router = Router()

router.use(verificarIP);

router.get('/administradores',getadministradores)
router.get('/administrador/:id',getadministrador)
router.post('/administrador',postadministrador)
router.put('/administrador/:id',putadministrador)
router.delete('/administrador/:id',deleteadministrador)


export default router