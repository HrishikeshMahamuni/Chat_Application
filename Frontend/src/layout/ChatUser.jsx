import React from 'react'
import useConversation from '../StateManage/useConversation.js'
import Loading from '../components/Loading.jsx';
import { useSocketContext } from '../context/SocketContext.jsx'


const ChatUser = () => {

    const { selectedConversation } = useConversation();
    const { onlineUsers } = useSocketContext();
    const getOnlineUser = (userId) => {
        return onlineUsers.includes(userId)?"online":"offline";
    };
    

    const store = useConversation();
    console.log("Selected Conversation - ",selectedConversation)
    // console.log("STORE =", store);

   
  return (

    <>
    <div className='h-[8vh]  p-3 flex items-center space-x-4 bg-slate-950'
    
    >  
        <div className={`avatar ${onlineUsers ? "online" : "offline"}`}>
            <div className="w-14 ">
                <img className='rounded-full' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s" />
            </div>
        </div>

        <div>
            <h1 className='text-xl'>
                 {selectedConversation?.name || "Select User"}
                 {/* Alex Stars */}
            </h1>
            <span className='text-sm'>
                 { `${getOnlineUser(selectedConversation?._id)}`}
            </span>
        </div>
    </div>
        
    

    </>

    
  )
}

export default ChatUser