import { Router } from "express";
import { postfinca } from "../controllers/fincacontrollers.js";

const router = Router();

router.post('/finca',postfinca)

export default router