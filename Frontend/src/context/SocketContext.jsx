import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authuser } = useAuth();

  const SOCKET_URL = import.meta.env.VITE_API_URL

    useEffect(() => {
      const userId = authuser?.user?._id;

      if (userId && !socket) {
        const tempsocket = io(SOCKET_URL || "http://localhost:4000", {
          query: { userId },
        });

        setSocket(tempsocket);

        tempsocket.on("getOnline", (users) => {
          setOnlineUsers(users);
          console.log("getOnline", tempsocket.id);
        });

        return () => {
          try { tempsocket.disconnect(); } catch (e) {}
          setSocket((prev) => (prev === tempsocket ? null : prev));
        };
      }

      if (!userId && socket) {
        try { socket.disconnect(); } catch (e) {}
        setSocket(null);
      }
    }, [authuser, socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );

};

