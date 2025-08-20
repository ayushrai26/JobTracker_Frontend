import React, { useState } from 'react'
import Lottie from 'lottie-react'
import forget from '../../assets/Animation - 1751277808652.json'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
function ForgotPassword() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [accessToChangePassword, setAccessToChangePassword] = useState(false)
  const navigate = useNavigate()
   const handleSubmit=async(e)=>{
     e.preventDefault();
     try{
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/forgetPassword',{
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({email})
     })
     console.log(response)
     if(response.ok){
      setAccessToChangePassword(true)
      toast.success('User matched you can now change your password')
     }else{
      alert('error')
     }
     }catch(err){
        console.log(err)
     }
    
   }
   const handleFinalSubmit=async(e)=>{
    e.preventDefault();
    try{
       const response =   await fetch('https://jobtracker-backend-ql5b.onrender.com/changePassword',{
            method:'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({email,password})
          })
          console.log(response)
          if(response.ok){
           toast.success('Password updated successfully');
        setAccessToChangePassword(false);
        setEmail('');
        setPassword('');
        navigate('/login')
          }else{
            toast.error('Error Password Updating')
          }
    }catch(err){
      console.log(err)
    }
   }
  return (
    <div className='h-full flex items-center '>
      <div className='w-1/2 h-full flex items-center justify-center'>
      <div className='w-3/4 h-3/4'>
        <Lottie loop={true} autoplay={true} animationData={forget}/>
      </div>
      
      </div>
      <div className='flex flex-col ml-25 w-1/2'>
      <div className='w-7/10 flex flex-col'>
        <h1 className='text-5xl  font-bold m-3'>Forget <br/> Your Password ?</h1>
        {accessToChangePassword?<div>
          <form className='flex flex-col' onSubmit={handleFinalSubmit}>
          
          <label className='text-2xl m-3'>Enter New Password</label>
          <input type='password' placeholder='Enter New Password' className='p-3 outline-none bg-gray-200 rounded-2xl m-3'
          value={password} onChange={(e)=>setPassword(e.target.value)}/>
           <button className='bg-blue-700 p-3  text-white rounded-2xl m-3' type='submit'>Reset Password</button>
        </form>
        </div>:
        <form className='flex flex-col' onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' className='p-3 outline-none bg-gray-200 rounded-2xl m-3' value={email} 
        onChange={(e)=>setEmail(e.target.value)}/>
        <button className='bg-blue-700 p-3  text-white rounded-2xl m-3' type='submit' >Reset Password</button>

</form>}
              </div>
        
      </div>
    </div>
  )
}

export default ForgotPassword