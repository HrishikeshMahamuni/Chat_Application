import React from 'react'
import Search from '../components/Search'
import Users from '../components/Users'

const Left = () => {
  return (
    <div className='w-[25%]  bg-slate-950 border border-gray-700'>
       <h1 className='text-2xl font-bold p-2 px-6'>
          Chats
      </h1>
      <Search />

      <Users/>
    </div>
  )
}

export default Left
