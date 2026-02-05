import express from "express";
import { getUser, editUser, follow, unfollow,updateBio } from "../controllers/user_controller.js";

const router = express.Router();

router.get("/",getUser);
router.patch("/edit",editUser);
router.post("/follow",follow);
router.post("/unfollow",unfollow);
router.post("/edit/bio",updateBio);

export default router;