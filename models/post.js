import {mongoose,Schema} from "mongoose";

const postSchema = new mongoose.Schema({
    uploadedBy: {type:Schema.Types.ObjectId,required: true},
    postCaption: {type: String},
    postImageUrl: {type: [String]},
    likedBy: {type: [Schema.Types.ObjectId],default:[]},
    comments: {type: [Schema.Types.ObjectId],default: []},
    shareCount: {type: Number,default: 0},
    tags: {type: [Schema.Types.ObjectId]},
    createdAt:{type: Date,default:Date.now},
    isEdited: {type: Boolean,default:false},
});

export default mongoose.model('Post',postSchema);