import {mongoose, Schema,} from "mongoose";

const commentReplySchema = mongoose.Schema({
    replyto: {type: Schema.Types.ObjectId, required: true},
    replier: {type: Schema.Types.ObjectId, required: true},
    reply: {type: String, required: true},
    cretedAt: {type: Schema.Types.Date,default: true},
});

export default mongoose.model('CommentReply',commentReplySchema);