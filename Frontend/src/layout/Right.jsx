import React, { useEffect } from 'react'
import ChatUser from './ChatUser.jsx'
import MessageSection from './MessageSection'
import useConversation  from '../StateManage/useConversation'
import TypeMsg from './TypeMsg'
import Loading from '../components/Loading'

import NoChat from './NoChat'

const Right = () => {

  const {selectedConversation , setSelectedConversation} = useConversation();
  
  useEffect(()=> {
    return setSelectedConversation(selectedConversation);
  },[selectedConversation])


  return (
    <>    
        <div className='w-[75%] border border-gray-600  bg-slate-900'>

          {!selectedConversation ? 
          ( 
              <NoChat />
          ) : 
          (
            <>
            <ChatUser />
              <div style={{ maxHeight: "calc(92vh - 8vh)" }} className='my-1 w-full flex-scrollbar scrollbar-none    overflow-y-auto'>
                <MessageSection />
              </div>
            <TypeMsg/>
            </>
        )

        }
      </div>

    
    </>
  )
}

export default Right



