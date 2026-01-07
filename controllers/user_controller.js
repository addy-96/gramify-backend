import user from "../models/user.js";
import AppErrors from "../core/error.js";

const fieldNotProvidedMessage = "Invalid request, all fileds not provided";

export const getUserProfile = async (req,res) => {
     try{

      const {id} = req.user;
      if(!id) return res.status(400).json({msg: "UserId not provided"});

      const userDetails = await user.findById({"_id":id},{password:0});
      if(!userDetails) return res.status(404).json("User not found");

      return res.status(200).json({msg: "User details fetch success", userDetails: userDetails});

     }catch(err){
        console.error(err);
        res.status(500).json({ msg: "Server error" });
     } 
}

export const editUserProfile = async (req,res)=>{
    try{
        const {id,username,fullname,phone,dob} = req.body;
        
        if(!id || !username || !fullname || !phone || !dob) {
          return AppErrors.handleClientError(400,fieldNotProvidedMessage,res);
        }
    
        const updatedUser =  await user.findByIdAndUpdate(id,{
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

export const updateUserBio = async (req,res) => {
    try{
        const {id, bio} = req.body;

        if(!id ||!bio) {
         return AppErrors.handleClientError(400,fieldNotProvidedMessage,res);
        }  

        const updateBio = await user.findByIdAndUpdate(id,{
            "profile.bio" : bio,
        });
        
        if(!updateBio) return  res.status(404).json("User not found");

        return res.status(201).json("Bio updated");
        
    }catch(err){
         AppErrors.handleServerError(err,res);
    }
}   

export const followUser = async (req, res) => {
  try {


  } catch (err) {
    AppErrors.handleServerError(err, res);
  }
};

export const unfollowUser = async (req,res) => {
    try{
 
        
    }catch(err){
        AppErrors.handleServerError(err,res);
    }
}  
