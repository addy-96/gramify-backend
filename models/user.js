import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
 username: {type: String, required: true, unique: true},
 email: {type: String, required: true, unique: true},
 password: {type: String, required: true},
 phone: {type: String},
 profile:{
    fullname: {type:String},
    bio: {type:String},
    avatarUrl: {type: String},
    location: {type:String}
 },
 followers: [{type:Schema.Types.ObjectId, ref: 'User'}],
 following: [{type: Schema.Types.ObjectId, ref: 'User'}],
 createdAt: {type:Date,default:Date.now}
});

export default mongoose.model("User", userSchema);