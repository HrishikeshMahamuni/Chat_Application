import User from "../Models/user.model.js";
import Message from "../Models/message.model.js";
import Conversation from "../Models/conversation.model.js";
import { getReceiverSocketId } from "../SocketIO/server.js";



const sendMessage = async (req, res) => {

    // console.log("Request Param Id - ",req.params.id)
    // console.log("Request Body Message - ",req.body.message)
    // console.log("hello")

    try {

        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;   // Current Logged in User

        let conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, receiverId]
            }
        });
       
        const newMessage = await Message.create({
            senderId: senderId, 
            receiverId: receiverId, 
            message
        });

        if (!conversation) {
                conversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [newMessage._id]
                });
            }
            else {
                conversation.messages.push(newMessage._id);
                 await conversation.save();
            }

        
        
        await Promise.all([newMessage.save(), conversation.save()]);   // await newMessage.save(); await conversation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            req.io(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json({
            message: "Message Sent Successfully",
            newMessage
        }); 
        
    }
    catch (error) {
        console.log("Error in Sending Message = ",error)
        res.status(500).json({message : "Internal Message Server Error"})
    }
}  

const getMessages = async (req, res) => {
    try{
        const {id:chatuser} = req.params;
        

        const senderId = req.user._id;   // Current Logged in User
        

        let conversation = await Conversation.findOne({
            participants:{
                $all: [senderId, chatuser]
            },
            
        }).populate("messages");
        if(!conversation){
            console.log("Conversation Not Found")
            return res.status(200).json({message: []});
        }
        const message = conversation.messages;
        res.status(200).json({message});

    }
    catch(error){
        console.log("Error in Getting Message = ",error)
        res.status(500).json({messages : "Internal Message Server Error"})
    }
}

export {sendMessage, getMessages}