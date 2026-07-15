import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import getAllUsers from '../context/getAllUsers'
import useConversation from '../StateManage/useConversation.js'

const Search = () => {

  const [search, setSearch] = useState('')
  const {getUsers} = getAllUsers();
  const {setSelectedConversation} = useConversation();

  const handelSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
      const conversation = getUsers.find((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    })

    if(conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    }
    else{
      alert("User Not Found")
    }


    setSelectedConversation(getUsers.find((user) => user.username === search));
    setSearch('')
  }

  return (

    <div className='px-6 py-4  w-full'>
      <form onSubmit={handelSubmit}>

        <div className='flex  space-x-3' >
          <label className='border border-gray-800 rounded-xl flex items-center gap-2 w-full'>
            <input type="text" 
                className=' bg-slate-800 text-white w-full rounded-xl p-3 ' 
                placeholder='Search...' 
                value={search}
                onChange={(e) => setSearch(e.target.value)}

            />

          </label>
          <button >
            <IoSearchSharp className='text-5xl p-2 hover:bg-slate-800 rounded-full duration-300' />
          </button>

        </div>

      </form>
    </div>

  )
}

export default Search
