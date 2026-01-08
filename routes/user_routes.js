import express from "express";
import { getProfile, editProfile, follow, unfollow } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/",getProfile);
router.put("/edit",editProfile);
router.patch("/follow",follow);
router.patch("/unfollow",unfollow);

export default router;