import React ,{ useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { CiLogout } from "react-icons/ci";
import toast from 'react-hot-toast';

import api from '../axios'

const Logout = () => {

  const [loading , setLoading] = useState(false);

  const navigate = useNavigate();

   const handelLogout = async() => {

    setLoading(true);

    try {
        const response = await  api.post('/api/user/logout')
        localStorage.removeItem("userInfo");
        Cookies.remove('jwt');
        setLoading(false);
        toast.success("User Logged Out Successfully")
        navigate("/login");
    } 
    catch (error) {
        console.log("Error = ", error);            
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
