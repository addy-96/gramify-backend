import User from "../models/user.js";
import AppErrors from "../core/error.js";

const fieldNotProvidedMessage = "Invalid request, all fileds not provided";

export const getProfile = async (req,res) => {
     try{

      const {id} = req.user;
      if(!id) return res.status(400).json({msg: "UserId not provided"});

      const userDetails = await User.findById({"_id":id},{password:0});
      if(!userDetails) return res.status(404).json("User not found");

      return res.status(200).json({msg: "User details fetch success", userDetails: userDetails});

     }catch(err){
        console.error(err);
        res.status(500).json({ msg: "Server error" });
     } 
}

export const editProfile = async (req,res)=>{
    try{
        const {id,username,fullname,phone,dob} = req.body;
        
        if(!id || !username || !fullname || !phone || !dob) {
          return AppErrors.handleClientError(400,fieldNotProvidedMessage,res);
        }
    
        const updatedUser =  await User.findByIdAndUpdate(id,{
            username:username,
            phone:phone,
            dob:dob,
            "profile.fullanme": fullname,
        },{
            new:true
        });

        if(!updatedUser) return res.status(404).json("User not found");

        return res.status(201).json(updatedUser);

    }catch(err){
       AppErrors.handleServerError(err,res);
    } 
}

export const updateBio = async (req,res) => {
    try{
        const {id, bio} = req.body;

        if(!id ||!bio) {
         return AppErrors.handleClientError(400,fieldNotProvidedMessage,res);
        }  

        const updateBio = await User.findByIdAndUpdate(id,{
            "profile.bio" : bio,
        });
        
        if(!updateBio) return  res.status(404).json("User not found");

        return res.status(201).json("Bio updated");
        
    }catch(err){
         AppErrors.handleServerError(err,res);
    }
}   

export const follow = async (req, res) => {
  try {
    const followerId = req.user.id; 

    const { userId } = req.body;

    if (!followerId || !userId) 
      return AppErrors.handleClientError(400,"User ID not provided",res);
    
    if (followerId === userId) return AppErrors.handleClientError(400,"You cannot follow yourself",res);
    
    const follower = await User.findById(followerId);
    
    if (follower.following.includes(userId)) return AppErrors.handleClientError(400,"User already followed",res);

    await User.findByIdAndUpdate(
        followerId,
        {$addToSet: {following: userId}}
    );
    await User.findByIdAndUpdate(
        userId,
        {$addToSet : {followers: followerId}}
    );
    return res.status(200).json({msg: 'User followed'});
  } catch (err) {
    AppErrors.handleServerError(err, res);
  }
};

export const unfollow = async (req,res) => {
    try{
        const followerId = req.user.id;
        const {userId} = req.body;
         
        if (followerId === userId) return AppErrors.handleClientError(400,"You cannot unfollow self",res);

        const follower = await User.findById(followerId);

        if (!follower.following.includes(userId)) return AppErrors.handleClientError(400,"You are not following this user",res);

        await User.findByIdAndUpdate(followerId,{$pull: {following:userId}});

        await User.findByIdAndUpdate(userId,{$pull: {followers:followerId}});
        
        return res.status(200).json({msg: 'User unfollowed'});

    }catch(err){
        AppErrors.handleServerError(res);
    }
}

