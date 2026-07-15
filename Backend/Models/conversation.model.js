import mongoose from "mongoose";
import User from "./user.model.js";
import Message from "./message.model.js";

const conversationScheme = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
        required: true
    }],
    createdAt : { 
        type: Date, 
        default: Date.now
    },
   
},
 {
    timestamps: true,
}
)

const Conversation = mongoose.model("Conversation", conversationScheme);
export default Conversation
