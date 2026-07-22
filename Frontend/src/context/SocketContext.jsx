import {createContext, useState, useEffect, useContext} from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () =>{ 
   return useContext(SocketContext);
}

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authuser} = useAuth();

    useEffect(() => {
        const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
        if (authuser) {
            const userId = authuser?.user?._id || authuser?._id;
            if (!userId) return;
            const tempsocket = io(BACKEND_URL, {
                query: { userId },
                withCredentials: true,
                transports: ["websocket", "polling"]
            });
            setSocket(tempsocket);

            tempsocket.on("getOnline", (users) => {
                    setOnlineUsers(users);
                    console.log("A user connected",tempsocket.id);
                });
            return () => {
                try { tempsocket.close(); } catch (e) { /* ignore */ }
            }
        }
        else {
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authuser]);

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
    
};

 