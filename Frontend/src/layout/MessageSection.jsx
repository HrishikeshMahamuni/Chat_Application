import React, { useEffect } from 'react';
import { useRef } from "react";
import Messages from './Messages';
import Loading from '../components/Loading';
import useGetMessages from '../context/useGetMessages';
import useConversation from "../StateManage/useConversation";
import useGetSocketMessage from '../context/useGetSocketMessage';


const MessageSection = () => {

  const lastMessageRef = useRef()
  useGetSocketMessage()

  const { messages = [], loading } = useGetMessages();

  // const store = useConversation();

  useEffect(() => {
    setTimeout(() => {
      if(lastMessageRef.current){
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }   
    },100);
  }, [messages]);


  
  // console.log("Entire Store =", store);

  // console.log("messages =", messages);
  // console.log("Array? -", Array.isArray(messages));

  return (
    <div
      style={{ minHeight: "calc(92vh - 8vh)" }}
      className="w-full p-4"
        
    >

      {/* Loading State */}
      {loading && <Loading />} 

      {/* Empty Chat State */}
      {!loading &&
        Array.isArray(messages) &&
        messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <p className="text-white text-center text-lg">
              Sayy Hii !! And Start Your Conversation
            </p>
          </div>
        )}
        

      {/* Messages State */}
      {!loading &&
        Array.isArray(messages) &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <div key={`${message._id}-${index}`} ref={lastMessageRef}>
              <Messages
                
                message={message}
              />
          </div>
        ))
      }

    </div>
  );
};

export default MessageSection;