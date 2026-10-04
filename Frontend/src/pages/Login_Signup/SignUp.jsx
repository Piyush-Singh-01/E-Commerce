
import React, { useState } from 'react'
import bg_image from "../../assets/Auth_BG.jpg"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import useAuth from '../../hooks/useAuth';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function SignUp() {
  const isLoading = useSelector((state)=> state.product.isLoading);
  const navigate = useNavigate();
  const [eye, setEye] = useState(true);
  const {signup} = useAuth();

  const [info, setInfo] = useState({
     username: "",
     email: "",
     password: "",

  })

  const handleInput = (e)=>{
       const {name, value} = e.target;

       setInfo((prev)=>({
          ...prev,
          [name] : value
       }));     
  }

  const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await signup(info);
            toast.success(response?.message || "Signup successfully");
            navigate("/")
        } catch (error) {
            toast.error(error.response?.data?.message || "Something wend wrong during Signup");
        }
  }

  return (
    <main className='w-full h-screen bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${bg_image})`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat'
        }}  
    >  
      <div className="absolute inset-0 bg-black/50"></div>

      <div className='relative z-10 w-full flex items-center justify-center lg:justify-start lg:pl-[12%] xl:pl-[15%] 2xl:pl-[18%] min-h-screen p-4'>
        <div className='p-8 backdrop-blur-md bg-white/10 border-white/20 border text-white w-full max-w-md rounded-2xl shadow-xl'>
           
            <h1 className='text-3xl font-bold text-center text-white'>Create Your Account</h1>
            <p className='text-center text-gray-300 mt-2 mb-8'>Join us and start shopping with confidence</p>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
              
                <div className='flex flex-col gap-2'>
                    <label>Username</label>
                    <input
                       onChange={handleInput}
                       type="username"
                       required
                       name="username"
                       value={info.username}
                       placeholder="Enter your name"
                       className='border border-white/30 bg-white/10 px-4 py-3 rounded-lg outline-none placeholder:text-gray-300 focus:border-blue-400'
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label>Email</label>
                    <input
                       onChange={handleInput}
                       type="email"
                       required
                       name="email"
                       value={info.email}
                       placeholder="Enter your email"
                       className='border border-white/30 bg-white/10 px-4 py-3 rounded-lg outline-none placeholder:text-gray-300 focus:border-blue-400'
                    />
                </div>
                
                <div className='flex flex-col gap-2 relative'>
                    <label>Password</label>
                    <input 
                       onChange={handleInput}
                       type={eye? 'password': 'text'}
                       name="password"
                       value={info.password}
                       required
                       placeholder="Enter password"
                       className='border border-white/30 bg-white/10 px-4 py-3 rounded-lg outline-none focus:border-blue-400' />
                    <span onClick={()=> setEye(!eye)} className='absolute right-4 top-12 text-xl cursor-pointer'>{eye ? <FaRegEyeSlash />: <FaRegEye />}</span>
                </div>
               
                <button className='py-3 mt-4 w-full bg-blue-600 hover:bg-blue-900 font-semibold rounded border cursor-pointer transition'>{isLoading ? "Loading..." : "Sign UP"}</button>
                <h1 className='text-center text-gray-300'>Already have an account?{" "}<Link to="/login" className='text-blue-400 hover:underline'>Login</Link></h1>
           
            </form>
        </div>
      </div>  
    </main>
  )
}

export default SignUp