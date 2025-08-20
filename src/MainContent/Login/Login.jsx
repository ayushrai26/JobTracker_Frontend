import React from 'react'
import { useState } from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom'
import logo from '../../assets/logo.png'
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { TbChartCohort } from "react-icons/tb";
import { RiPlayListAddLine } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { toast } from 'react-toastify';
function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(true)
    const navigate = useNavigate();
    const handleLogin =async (e)=>{
        e.preventDefault();
        try{
          const response =   await fetch('http://localhost:3000/login',{
                method : 'POST',
                headers: {
               'Content-Type': 'application/json'
  },
                body:JSON.stringify({email,password})
            })
            const data = await response.json();
            console.log(data)
            
            
            if(response.ok){
                console.log('Login successfull')
                localStorage.setItem('user',JSON.stringify(data.user));
            localStorage.setItem('token',data.token)
                if(data.user.role==='admin'){
                 navigate('/admin/dashboard')
                 toast.success('Admin Login Successfull')
                }else{
                navigate('/dashboard')
                toast.success('User Login Successfull')
                }

            }else{
                if(data.message === 'User not found'){
                toast.error('User not found, Check Your Email and try again')
            }else if(data.message === 'Wrong Password'){
                 toast.error('Wrong Password')
            }
                
                
            }

        }catch(err){
             console.error(err);
        alert('Server error. Please try again later.');
        }

    }
  return (
    <div className='flex   h-full items-center justify-center'>
        <div className='bg-blue-700 w-1/2 h-full flex flex-col justify-center items-center'>
            <div className='flex items-center gap-5'>
                <img src={logo} className='w-20 h-20 rounded-full'/>
                <div className='h-15 w-0.5 bg-white'></div>
            <h1 className='text-2xl font-bold text-white'>TrackHire</h1>
            
            </div>
            
            <hr className="w-1/2 border-t-2 border-white my-4" />

            <div className='p-6'>
                <div className='flex items-center gap-2'> <TbChartCohort className='text-yellow-500 text-xl' /> <h1 className='text-white p-2'>Application Tracker</h1></div>
               <div className='flex items-center gap-2'><AiFillThunderbolt className='text-yellow-500 text-xl'/> <h1 className='text-white p-2'>RealTime Update</h1></div>
               <div className='flex items-center gap-2'><RiPlayListAddLine className='text-yellow-500 text-xl' /> <h1 className='text-white p-2'>Add New Job Application</h1></div>
               <div className='flex items-center gap-2'><IoExtensionPuzzleOutline className='text-yellow-500 text-xl'/> <h1 className='text-white p-2'>Responsive UI</h1></div>
               
            </div>
        </div>
        <div className='w-1/2  '>
            <div >
            <form className='flex flex-col items-center justify-center bg-amber-100 w-3/4 ml-17 p-10 rounded-2xl ' onSubmit={handleLogin}>
            <h1 className='text-2xl font-bold'>Login</h1>
            <span className='relative bg-gray-100 rounded-2xl w-3/4 p-3 mt-5'>
            <input type='email' placeholder='Email'className='w-full outline-none' onChange={(e)=>setEmail(e.target.value)} value={email} required/><MdOutlineAlternateEmail className='absolute right-6 top-4' /></span>
            
            {showPassword?(<>
             <span className='bg-gray-100 rounded-2xl w-3/4 p-3 mt-5 relative'><input type='password' placeholder='Password' className='w-full outline-none' onChange={(e)=>setPassword(e.target.value)} value={password}/><FaRegEyeSlash onClick={()=>setShowPassword(!showPassword)} className='absolute right-6 top-4' /></span>
            </>):(<> 
            <span className='bg-gray-100 rounded-2xl w-3/4 p-3 mt-5 relative'>
            <input type='text' placeholder='Password' className='w-full outline-none' onChange={(e)=>setPassword(e.target.value)} value={password}/><MdOutlineRemoveRedEye onClick={()=>setShowPassword(!showPassword)}  className='absolute right-6 top-4'/></span>
            
            </>)}
            
            <button className='bg-blue-800 text-white rounded-2xl p-2 w-25 mt-5 cursor-pointer' type='submit'>LOG IN</button>
            <div className='mt-3'>
                <Link to='/forgot-password'><p className='text-sm text-blue-600'>Forget Password ?</p></Link>
            </div>
            <div className='p-3 flex flex-col items-center'>
                <p className='text-sm'>Don't have an account yet?<br/>
            </p>
            <p className='text-sm'>Sign up here for free!</p>
           <Link className='p-3' to='/signup'><p className='text-sm text-blue-600'>REGISTER</p></Link> 
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Login