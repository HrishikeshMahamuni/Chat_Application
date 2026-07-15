import React from 'react'
import { useAuth } from '../context/AuthProvider'

const NoChat = () => {

     const {authuser, setAuthuser} = useAuth()

    console.log("Auth User = " , authuser.user.name)

  return (
     <>
          <div className="flex h-screen items-center justify-center bg-slate-800">
      <div className="w-80 rounded-xl bg-slate-900 p-8 text-center ">
        {/* Icon */}
        <div className="mb-5 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
            <span className="text-5xl">🔥</span>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white">
          Welcome {authuser.user.name} Chat!
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-300">
          Feel free to start a new conversation
          <br />
          by tapping the button below.
        </p>

        {/* Button */}
        <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-900 px-6 py-3 font-medium text-white  transition hover:bg-pink-200">
          <span className="text-xl">+</span>
          Start New Chat
        </button>
      </div>
    </div>

    </>
  )
}

export default NoChat
