import express from "express";
import {createPost, editPost, deletePost,likeUnlikePost,commentOnPost,editComment,deleteComment,replyToComment} from "../controllers/post_controller.js";

const router = express.Router();

router.post("/create", createPost);
router.patch("/edit", editPost);
router.delete("/delete",deletePost);
router.post("/like",likeUnlikePost);
router.post("/comment",commentOnPost);
router.post("/comment/reply",replyToComment);
router.post("/comment/edit",editComment);
router.delete("/comment/delete",deleteComment);

export default router;

