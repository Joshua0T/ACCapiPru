import { Router } from "express";
import { getcafe, getcafes, postcafe, putcafe } from "../controllers/cafecontrollers.js";

const router = Router()

router.post('/cafe',postcafe)
router.get('/cafe/:id',getcafe)
router.get('/cafe',getcafes)
router.put('/cafe/:id',putcafe)

export default router