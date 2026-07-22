import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthProvider'
import api from "../axios.js"
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {

    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  const { authuser, setAuthuser } = useAuth()
  const onSubmit = (data) => { 
    console.log(data)
    const userInfo = {
        email: data.email,
        password: data.password
    }

    api.post('/api/user/login', userInfo)
    .then((res) => {
        console.log(res.data)
        const user = res.data.user || res.data;
        toast.success("User Logged In Successfully")
        localStorage.setItem("userInfo", JSON.stringify(user))
        setAuthuser(user)
        navigate("/");
    })
    .catch((error) => {
        console.log(error)
        const msg = error?.response?.data?.message || error.message || 'Login failed';
        toast.error(msg)
        alert(msg)
    })

    console.log("Backend URL - ", import.meta.env.VITE_API_URL);
    
}

//   console.log(watch("example")) 


  return (
    <div className='flex m-auto justify-center items-center '>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="hero min-h-screen ">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend text-2xl font-bold text-center">Login</legend>

                    <label className="label">Email</label>
                    <input 
                        type="email" 
                        className="input" 
                        placeholder="Email"
                        {...register("email" , {required: "This field is required"})}  
                    />
                    {errors.email && <p className='text-red-600'>{errors.email.message}</p>}

                    <label className="label">Password</label>
                    <input 
                        type="password" 
                        className="input" 
                        placeholder="Password" 
                        {...register("password" , {required: "This field is required"})}
                    />
                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                    <button 
                        className="btn btn-neutral mt-4"
                        type='submit'
                        >
                        Login
                    </button>

                    <p className="mt-4 text-center">
                        Don't have an account? <Link to={"/signup"} className="link text-blue-600 font-bold"  href="/signup">SignIn</Link>
                    </p>
                </fieldset>
            </div>
        </form>
      
    </div>
  )
}

export default Login
