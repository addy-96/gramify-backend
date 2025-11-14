import express from "express";
import { getUserProfile, editUserProfile } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/",getUserProfile);
router.put("edit",editUserProfile);

export default router;