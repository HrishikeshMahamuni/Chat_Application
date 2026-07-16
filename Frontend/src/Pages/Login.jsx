import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
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
    console.log(userInfo)

    axios.create({
    baseURL:  import.meta.env.VITE_API_URL,
    withCredentials: true,
    })

    axios.post('/api/user/login', userInfo).then((res) => {

        console.log(res.data)
        if(res.data){
            toast.success("User Logged In Successfully")
        }

        if(res.data ==! res.data.email || res.data ==! res.data.password){
            res.status(400).json({
                message: "Invalid credentials"
            })
            toast.error("Invalid credentials")
        }
        localStorage.setItem("userInfo", JSON.stringify(res.data))
        
        setAuthuser(res.data)
        navigate("/");
        
    })
    .catch((error) => {

         if(error.response){
            alert(error.response.data.message);
        }

        console.log(error)
    })
    
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
                    {errors.email && <p className='text-red-600'>{errors.name.message}</p>}

                    <label className="label">Password</label>
                    <input 
                        type="password" 
                        className="input" 
                        placeholder="Password" 
                        {...register("password" , {required: "This field is required"})}
                    />
                    {errors.password && <p className='text-red-600'>{errors.name.message}</p>}

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
