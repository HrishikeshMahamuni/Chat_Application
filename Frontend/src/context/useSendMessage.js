import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import useConversation from "../StateManage/useConversation";
import api from "../axios";


const useSendMessage = () => {

    const [loading, setLoading] = useState(false);

    const {
        messages,
        setMessages,
        selectedConversation,
    } = useConversation();

    const store = useConversation();
        // console.log("STORE =", store);

      const sendMessages = async (text) => {

          if (!selectedConversation?._id) {
            setMessages([]);
            return;
          }
           if (!text.trim()) {
              return;
            }

          try {
            setLoading(true);
            const { data } = await axios.post(
              `/api/message/send/${selectedConversation._id}`,
              { message:  text }
            );
            console.log("Sending Text =", text);
            console.log("API Response =", data);

            setMessages([...messages, data.newMessage ]);

          } catch (error) {
            console.log("Error In useSendMessages = ",error);

          } finally {
            setLoading(false);
          }
          console.log("Messages State =", messages);
          console.log("Array =", Array.isArray(messages));
          
    };


  return {
    
    sendMessages,
  };
}

export default useSendMessage
