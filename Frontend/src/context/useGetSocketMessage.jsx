import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../StateManage/useConversation.js'


const useGetSocketMessage = () => {

    const {socket} = useSocketContext()
    const {messages , setMessages} = useConversation();

    useEffect(() => {

        const notification = new Audio('/MessageTune.mp3');
        notification.play();

        socket.on("newMessage", (newMessage) => {
            setMessages(...Messages, newMessage);
          });
          return () => socket.off("newMessage");

    }, [socket, messages, setMessages])

  
}

export default useGetSocketMessage
