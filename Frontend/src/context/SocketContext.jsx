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
        if(authuser) {
            const tempsocket = io("http://localhost:3000", {
                query: {
                    userId: authuser.user._id
                },
            });
            setSocket(tempsocket);

            
            tempsocket.on("getOnline", (users) => {

                    setOnlineUsers(users);
                    console.log("A user disconnected",tempsocket.id);
                   
                });
                return () => {
                    socket.close();
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

 