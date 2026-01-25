import Post from "../models/post.js";
import AppErrors from "../core/error.js";

export const createPost = async (req,res) => {
    try{
      const {postCaption,postImageUrl} = req.body;
      const user = req.user;
      console.log(user);
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
    if(!postId || !postCaption) return AppErrors.handleClientError(400,"Parameters not provided",res);
    const post = Post.findById(postId);
    if(!post) return AppErrors.handleClientError(404,"Post not found");
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

export const likeUnlikePost = async (req,res) => {
  try{
    const {postId} = req.body;
    const user = req.user;
    if(!postId) return AppErrors.handleClientError(400,"Parameters not provided",res);
    const post = await Post.findById(postId);
    console.log(post);
    return res.status(200).json({msg: 'Post Liked'});
  }catch(err){
    return AppErrors.handleServerError(err,res);
  }
}

export const commentOnPost = async (req,res) => {
    
}

export const replyToComment = async (req,res) => {

}

export const editComment = async (req,res) => {
    
}

export const deleteComment = async (req,res) => {

}


