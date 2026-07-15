import React from 'react'
import useConversation from '../StateManage/useConversation.js'
import { useSocketContext } from '../context/SocketContext.jsx'

const User = ({user}) => {

  const {selectedConversation , setSelectedConversation} = useConversation();
  const isSelected = selectedConversation?._id === user._id ;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  const store = useConversation();

  // console.log("STORE =", store);
  const handleSelectUser = () => {
    console.log("CLICKED USER =", user);

    setSelectedConversation(user);

    console.log("STORE AFTER CLICK =",useConversation.getState())
};
  
  
  return (
    <div className={`hover:bg-slate-500 duration-300 
      ${isSelected ? "bg-slate-600" : ""}`}
      onClick={handleSelectUser}
      
    >
      <div className='px-8 py-7 items-center cursor-pointer hover:bg-slate-800 rounded-lg flex gap-2 space-x-4'>
        <div className={`avatar ${isOnline ? "avatar-online" : ""}`}>
          <div className="w-16 rounded">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmRLRMXynnc7D6-xfdpeaoEUeon2FaU0XtPg&s"
            className='rounded-full' />
          </div>
        </div>
          <div>
            <h1>{user.name}</h1>
            <span>{user.email}</span>
          </div> 
      </div>

    </div>
  )
}

export default User