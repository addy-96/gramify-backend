import express from "express";
import {createPost, editPost, deletePost,likeUnlikePost,commentOnPost,deleteComment,replyToComment} from "../controllers/post_controller.js";
import checkPostOwnerShip from "../middlewares/check_post_ownership.js";

const router = express.Router();

router.post("/create", createPost);
router.patch("/edit",checkPostOwnerShip, editPost);
router.delete("/delete",checkPostOwnerShip, deletePost);
router.post("/like",likeUnlikePost);
router.post("/comment",commentOnPost);
router.post("/comment/reply",replyToComment);
router.delete("/comment/delete",deleteComment);

export default router;

