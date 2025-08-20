import React from 'react'
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import signup1 from '../../assets/2941990.jpg'
import { FaRegEyeSlash } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import logo from '../../assets/logo.png'
import signup2 from '../../assets/5292747.jpg'
import { toast } from 'react-toastify';
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
function Signup() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(true)
const [fullName,setFullName] = useState('')
    const navigate = useNavigate();

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/user/signup',{
            method:'POST',
             headers: {
    'Content-Type': 'application/json'
  },
            body:JSON.stringify({fullName,email,password})
        })
        const data = await response.json();
        if (response.ok) {
     toast.success('Signup successful!');
      navigate('/login')
    } else {
      toast.error(data.message || 'Signup failed');
    }
    }catch(err){
        console.error(err);
        toast.error('An error occured')
    }
  }

  return (
    <div className='flex   h-full items-center justify-center'>
       
        <div className='bg-blue-700 w-1/2 h-full flex flex-col gap-5 justify-center items-center'>
          <div className='flex  items-center gap-5'>
                      <img src={logo} className='w-20 h-20 rounded-full'/>
                      <div className='h-15 w-0.5 bg-white'></div>
                  <h1 className='text-2xl font-bold text-white'>TrackHire</h1>
                  </div>
                 
                 <hr className="w-1/2 border-t-2 border-white my-1" />
                  <h1 className='text-2xl font-bold text-white'>Create Your Account for Free !</h1>
                  <div className='flex gap-5'>
            <img src={signup1} width={200}/>
            <img src={signup2} width={200}/>
            </div>
        </div>
        
        <div className='w-1/2  '>
        
            <div >
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center bg-amber-100 w-3/4 ml-17 p-10 rounded-2xl'>
            <h1 className='text-2xl font-bold'>SignUp</h1>
            <span className='relative bg-gray-100 rounded-2xl w-3/4 p-3 mt-5' >
            <input type='text' placeholder='Full Name' className='w-full outline-none' onChange={(e)=>setFullName(e.target.value)} value={fullName} required/>
            <MdOutlineDriveFileRenameOutline className='absolute right-6 top-4' />
            </span>
            <span className='relative bg-gray-100 rounded-2xl w-3/4 p-3 mt-5'>
            
            <input type='email' placeholder='Email'className='w-full outline-none' onChange={(e)=>setEmail(e.target.value)} value={email} required/>
            <MdOutlineAlternateEmail className='absolute right-6 top-4' /></span>
            
            {showPassword?(<>
             <span className='bg-gray-100 rounded-2xl w-3/4 p-3 mt-5 relative'>
             <input type='password' placeholder='Password' className='w-full outline-none' onChange={(e)=>setPassword(e.target.value)} value={password}/>
             <FaRegEyeSlash onClick={()=>setShowPassword(!showPassword)} className='absolute right-6 top-4' /></span>
            </>):(<>
            <span className='bg-gray-100 rounded-2xl w-3/4 p-3 mt-5 relative'>
            <input type='text' placeholder='Password' className='w-full outline-none' onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <MdOutlineRemoveRedEye onClick={()=>setShowPassword(!showPassword)}  className='absolute right-6 top-4'/></span>
            
            </>)}
            
            <button className='bg-blue-800 text-white rounded-2xl p-2 w-25 mt-5 cursor-pointer' type='submit'>SIGNUP</button>
            
            <div className='p-3 flex flex-col items-center'>
                <p className='text-sm'>Already have an account ?<br/>
            </p>
            <p className='text-sm'>Login here!</p>
           <Link className='p-3' to='/login'><p className='text-sm text-blue-600'>LOGIN</p></Link> 
            </div>
            </form>
        </div>
        </div>
    </div>
  )
}

export default Signup