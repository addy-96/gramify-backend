import {mongoose, Schema,} from "mongoose";

const commentSchema = new mongoose.Schema({
    comment: {type: String,required: true},
    commentBy: {type: Schema.Types.ObjectId, required: true},
    createdAt: {type: Date, default:Date.now}
});

export default mongoose.model('Comment',commentSchema);