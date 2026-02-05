import Post from "../models/post.js";
import AppErrors from "../core/error.js";

const checkPostOwnerShip = async (req,res,next) => {
  const post = await Post.findById(req.body.postId);
  if (!post) return AppErrors.handleClientError(404, "Post not found", res);
  if (post.uploadedBy.toString() !== req.user.id) {
    return AppErrors.handleClientError(401, "Unauthorized", res);
  }
  next();
}

export default checkPostOwnerShip;