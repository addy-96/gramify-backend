import user from "../models/user.js";

export const getUserProfile = async (req,res) => {
     try{
      
      const {id} = req.body;
      if(!id) return res.status(400).end("UserId not provided");

      const userDetails = await user.findById({"_id":id});
      if(!userDetails) return res.status(404).json("User not found");

      return res.status(200).json({userDetails});

     }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
     } 
}

export const editUserProfile = async (req,res)=>{
    try{
        const {id, username,fullname,phone,dob} = req.body;
        
        if(!id || !username || !fullname || !phone || !dob) {
            return res.status(400).json("Invalid request");
        }
    
        const updatedUser =  await user.findByIdAndUpdate(id,{
            fullname:fullname,
            username:username,
            phone:phone,
            dob:dob
        },{
            new:true
        });

        if(!updatedUser) return res.status(404).json("User not found");

        return res.status(201).json(updatedUser);

    }catch(err){
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

