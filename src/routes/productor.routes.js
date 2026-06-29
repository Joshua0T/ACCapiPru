import { Router } from "express";
import { deleteproductor, getproductor, getproductores, postproductor, putproductor } from "../controllers/productorcontrollers.js";

const router = Router();

router.post('/productor',postproductor)
router.get('/productor/:id',getproductor)
router.get('/productores',getproductores)
router.put('/productor/:id',putproductor)
router.delete('/productor/:id',deleteproductor)

export default router