import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useAuth } from '../context/AuthProvider'
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';
import api from "../axios.js"

const Signup = () => {

  const { authuser, setAuthuser } = useAuth()

   const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

   const onSubmit = async (data) => {
    console.log(data)
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
    console.log(userInfo)
    
     await api.post('/api/user/signup', userInfo).then((res) => {

        console.log(res.data)
        if(res.data){
          toast.success("User Registred Successfully")
          console.log("Auth User : ", authuser)
          navigate("/login");
        }
        // setAuthuser(res.data)
        // localStorage.setItem("userInfo", JSON.stringify(res.data))
       

      })
      .catch((error) => {

        if(error.response){
          toast.error("Error Occured : ",error.response.data.error)
        }

        console.log(error)
      })
      
  }




  const password = watch("password", "")
  const confirmPassword = watch("confirmPassword", "")
   const validatePasswordMatch = (value) => {
   
    return value === password || "Passwords do not match"
  }

  // console.log(watch("example")) 





  return (
    <div className='flex  min-h-screen justify-center items-center'>
     <form onSubmit={handleSubmit(onSubmit)}>
        {/* <h1 className='text-center text-5xl font-bold mb-6'>Create Account</h1> */}
        <div className=''>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend text-2xl font-bold text-center">SignUp</legend>

              {/* Name */}

               <label className="label">Name</label>
              <input type="text" 
              className="input" 
               {...register("name" , {required: "This field is required"})} 
               placeholder="Name" />
               {errors.name && <span className='text-red-500'>{errors.name.message}</span>}

               {/* Email */}

              <label className="label">Email</label>
              <input type="email"
               className="input" 
               {...register("email" , {required: "This field is required"})} 
               placeholder="Email" />
               {errors.email && <span className='text-red-500'>{errors.email.message}</span>}

              {/* Password */}

              <label className="label">Password</label>
              <input type="password" 
              required 
              className="input" 
              {...register("password" , {required: "This field is required"})}
              placeholder="Password" />
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}

              {/* Confirm Password */}

              <label className="label">Confirm Password</label>
              <input type="password" 
              required 
              className="input" 
              {...register("confirmPassword", {required: "This field is required", validate: validatePasswordMatch})}
              placeholder="Confirm Password" />
              {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}

              <button 
                  type="submit"
                  className="btn btn-neutral mt-4"
              >
                SignUp
              </button>

              <p className="mt-4 text-center">
                Already have an account? <Link to={"/login"} className="link text-blue-600 font-bold"  >Login</Link>
              </p>
            </fieldset>
        </div>
     </form>
    </div>
  )
}

export default Signup
