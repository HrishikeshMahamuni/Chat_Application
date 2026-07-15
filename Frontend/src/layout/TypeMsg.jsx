import React, { useState } from 'react'

import { IoMdSend } from "react-icons/io";
import useSendMessage from '../context/useSendMessage.js'


const TypeMsg = () => {

  const { sendMessages} = useSendMessage();
  const [message , setMessage] = useState("");

  const handelSubmit = async(e) => {
    e.preventDefault();
     if (!message.trim()) return;
    await sendMessages(message);
    setMessage("")
  }

  return (
    <form onSubmit={ handelSubmit }>
    <div className='flex items-center p-4 h-[8vh] border-t border-gray-800'>
        <div className='w-[70%] mx-4'>
            <input 
              type="text" 
              placeholder="Type here" 
              value={message}
              onChange={(e)=> 
                setMessage(e.target.value)
              }
              className=" bg-slate-700 w-full px-6 py-2 rounded-xl grow outline-none" 
            />
        </div>
       <button>
            <IoMdSend  className='text-5xl font-bold p-3 hover:bg-slate-800 rounded-lg duration-300' />
       </button>
    </div>
    </form>
  )
}

export default TypeMsg