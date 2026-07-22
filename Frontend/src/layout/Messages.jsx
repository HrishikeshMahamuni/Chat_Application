import React from 'react'


const Messages = ({message}) => {

    const stored = localStorage.getItem("userInfo");
    const authuser = stored ? JSON.parse(stored) : null;
    const authId = authuser?.user?._id || authuser?._id || null;

    const itsMe = authId ? message.senderId === authId : false;

        const chatName = itsMe ? "chat-end" : "chat-start";
        const chatColor = itsMe ? "chat-bubble-primary" : "chat-bubble-accent";
        const createdAt = new Date(message.createdAt);
        const formattedTime = createdAt.toLocaleTimeString([], 
            { 
                hour: '2-digit', 
                minute: '2-digit' 
            }
        );
    
    

  return (
    <div style={{ maxHeight: "calc(100% - 100px)" }} className='my-1 w-full flex-scrollbar scrollbar-none overflow-y-auto'>
        <div className=''>
            <div className={`chat ${chatName} `}>
                
                <div className={`chat-bubble  ${chatColor}`}>
                    {message.message}
                </div>
                <div className='chat-footer text-xs opacity-60 mt-1'>
                    {formattedTime}
                </div>
                 
            </div>
            
        </div>

        
    </div>
  )
}

export default Messages