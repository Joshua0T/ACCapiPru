import { Router } from "express";
import { deleteadministradorip, getadministradoresip, getadministradorip, postadministradorip, putadministradorip } from "../controllers/administradoripcontrollers.js"


const router = Router();

router.post('/administradorip',postadministradorip)
router.get('/administradoresip',getadministradoresip)
router.get('/administradorip/:id',getadministradorip)
router.put('/administradorip/:id',putadministradorip)
router.delete('/administradorip/:id',deleteadministradorip)

export default router