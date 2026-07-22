import React, { useState } from 'react'
import api from '../axios.js'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from 'react-icons/ci'
import toast from 'react-hot-toast'

const Logout = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handelLogout = async () => {
    setLoading(true)
    try {
      await api.post('/api/user/logout')
      localStorage.removeItem('userInfo')
      Cookies.remove('jwt')
      toast.success('User Logged Out Successfully')
      navigate('/')
    } catch (error) {
      console.log('Logout error = ', error)
      toast.error('Logout failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-[4%] bg-slate-900 text-white flex flex-col justify-end'>
      <div className='p-3 align-bottom '>
        <button onClick={handelLogout}>
          <CiLogout className='text-5xl font-bold p-2 hover:bg-slate-800 rounded-full duration-300' />
        </button>
      </div>
    </div>
  )
}

export default Logout
