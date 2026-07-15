import React from 'react'
import { useState, useEffect } from 'react';
import User from './User'
import  getAllUsers  from '../context/getAllUsers'
import useConversation from '../StateManage/useConversation';

const Users = () => {

  const [getUsers, loading] = getAllUsers();
  // console.log(getUsers)
  // console.log("getUsers =", getUsers);
  // console.log("Is Array =", Array.isArray(getUsers));
  // console.log(typeof getUsers)
  
  return (
    <>
      <div style={{ maxHeight: "calc(100% - 100px)" }} 
      
      className='my-1 flex-scrollbar scrollbar-none overflow-y-auto'
      
      >
        {/* <User user={getAllUsers.users} /> */}
        {   
            getUsers?.map((user) => (
              <User key={user._id} user={user} />
            ))
        }
       
      </div>

    </>
  )
}

export default Users
