import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext.jsx'
import useConversation from '../StateManage/useConversation.js'

const useGetSocketMessage = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            try {
                new Audio('/MessageTune.mp3').play();
            } catch (e) {}
            setMessages((prev = []) => [...prev, newMessage]);
        };

        socket.on('newMessage', handleNewMessage);
        return () => {
            try {
                socket.off('newMessage', handleNewMessage);
            } catch (e) {}
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socket, setMessages]);
};

export default useGetSocketMessage
