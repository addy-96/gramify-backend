import express from "express";
import {register, login, refresh} from "../controllers/auth_controller.js"
import { verifyJWT } from "../middlewares/auth_middleware.js"

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/refresh",refresh);

export default router;
