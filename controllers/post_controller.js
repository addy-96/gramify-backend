import Post from "../models/post.js";
import AppErrors from "../core/error.js";

export const createPost = async (req,res) => {
    try{
      const {post} = req.body;
      
      if(!post) return AppErrors.handleClientError(400,"Parameters not provided",res);
    
      await Post.insertOne({
        
      });


    }catch(err){
      AppErrors.handleServerError(err,res);  
    }
}

export const editPost = async (req,res) => {

}

export const deletePost = async (req,res) => {
    
}

export const likeUnlikePost = async (req,res) => {
    
}

export const commentOnPost = async (req,res) => {
    
}

export const replyToComment = async (req,res) => {

}

export const editComment = async (req,res) => {
    
}


