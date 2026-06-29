import { Router } from "express";
import {getip, getips, postid} from '../controllers/authipcontrollers.js'

const router = Router()


router.post('/ip',postid)
router.get('/ip/:id',getip)
router.get('/ip',getips)

export default router