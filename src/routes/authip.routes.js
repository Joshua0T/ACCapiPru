import { Router } from "express";
import { deleteip, getip, getips, postip, putip} from '../controllers/authipcontrollers.js'

const router = Router()


router.post('/ip',postip)
router.get('/ip/:id',getip)
router.get('/ip',getips)
router.put('/ip/:id',putip)
router.delete('/ip/:id',deleteip)

export default router