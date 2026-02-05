import Post from "../models/post.js";
import AppErrors from "../core/error.js";
import Comment from "../models/comment.js";
import CommentReply from "../models/comment_reply.js";

export const createPost = async (req,res) => {
    try{
      const {postCaption,postImageUrl} = req.body;
      const user = req.user;
      if(!postCaption || !postImageUrl) return AppErrors.handleClientError(400,"Parameters not provided",res);
      await Post.insertOne({
        uploadedBy: user.id,
        postCaption: postCaption,
        postImageUrl: postImageUrl,
      });
      return res.status(200).json({msg:"Post created"});
    }catch(err){
     return AppErrors.handleServerError(err,res);  
    }
}

export const editPost = async (req,res) => {
  try{
    const {postId,postCaption} = req.body;
    const {id} = req.user;
    if(!postId || !postCaption) return AppErrors.handleClientError(400,"Parameters not provided",res);
    
    const post = await Post.findById(postId);
    if (!post) {
      return AppErrors.handleClientError(404, "Post not found", res);
    }

    await Post.findByIdAndUpdate(postId,{
     postCaption: postCaption,
     isEdited: true,
    });
    return res.status(201).json({msg: "Post edited"});
  }catch(err){
    return AppErrors.handleServerError(err,res);
  }
}

export const deletePost = async (req,res) => {
    try{
      const {postId} = req.body;
      if(!postId) return AppErrors.handleClientError(400,"Parameters not provided",res);
      const post = Post.findById(postId);
      if(!post) return AppErrors.handleClientError(404,"Post not found");
      await Post.findByIdAndDelete(postId);
      return res.status(201).json({msg: "Post deleted"});
    }catch(err){
      return AppErrors.handleServerError(err,res);
    }
}

export const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const { id } = req.user;

    if (!postId) return AppErrors.handleClientError(400, "Parameters not provided", res);

    const post = await Post.findById(postId);
    if (!post) return AppErrors.handleClientError(404, "Post not found", res);

    if (post.likedBy.includes(id)) {
      await Post.findByIdAndUpdate(postId, { $pull: { likedBy: id } });
      return res.status(200).json({ msg: "Post unliked" });
    } else {
      await Post.findByIdAndUpdate(postId, { $addToSet: { likedBy: id } });
      return res.status(200).json({ msg: "Post liked" });
    }
  } catch (err) {
    return AppErrors.handleServerError(err, res);
  }
};

export const commentOnPost = async (req,res) => {
    try{
      const {comment,postId} = req.body;
      if(!comment || !postId) return AppErrors.handleClientError(400,"Parameters not provided",res);

      const post = await Post.findById(postId);
      if(!post) return AppErrors.handleClientError(404,"Post not found",res);
      
      const createdComment = await Comment.create({
        comment,
        commentBy: req.user.id,
        });

      await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { comments: createdComment._id } }, 
      );
      
      return res.status(201).json({
        msg: "Success"
      });
    }catch(err){
      return AppErrors.handleServerError(err,res);
    }
}

export const replyToComment = async (req,res) => {
    try{
      const {commentId, reply} = req.body;
      if(!commentId||!reply) return AppErrors.handleClientError(400,"Parameters not provided",res);

      const comment = Comment.findById(commentId);
      if(!comment) return AppErrors.handleClientError(404,"Comment not found",res);

      await CommentReply.create({
        replyto: commentId,
        replier: req.user.id,
        reply: reply,
      });
      return res.status(200).json({msg: "Success"});
    }catch(err){
      return AppErrors.handleServerError(err,res);
    }
}

export const deleteComment = async (req,res) => {
  try{
    const {commentId} = req.body;
    if(!commentId) return AppErrors.handleClientError(400,"Parameters not provided.",res);

    const comment = await Comment.findById(commentId);

    if(!comment) return AppErrors.handleClientError(404,"Comment not found",res);

    const {id} = req.user;
    if(comment.commentBy!=id) return AppErrors.handleClientError(401, "Unauthorized", res);

    await Comment.findByIdAndDelete(commentId);

    await CommentReply.deleteMany({ replyto: commentId });

    return res.status(200).json({msg: "Success"});

  }catch(err){
     return AppErrors.handleServerError(err,res);
  }
}


