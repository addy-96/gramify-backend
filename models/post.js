import {mongoose,Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    uploadedeBy: {type:Schema.Types.ObjectId},
    postCaption: {type: String},
    postImageUrl: {type: [String]},
    likedBy: {type: [Schema.Types.ObjectId]},
    comments: {type: [Schema.Types.ObjectId]},
    shareCount: {type: Number,default: 0},
    tags: {type: [Schema.Types.ObjectId]},
    createdAt:{type: Date,default:Date.now}
});

export default mongoose.model('Post',postSchema);