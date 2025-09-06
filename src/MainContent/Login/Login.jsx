import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { TbChartCohort } from "react-icons/tb";
import { RiPlayListAddLine } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";
import { FaRegEyeSlash } from "react-icons/fa"
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { toast } from 'react-toastify';
import {Loader2} from 'lucide-react'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token)
        if (data.user.role === 'admin') {
          navigate('/admin/dashboard')
          toast.success('Admin Login Successfull')
        } else {
          navigate('/dashboard')
          toast.success('User Login Successfull')
        }

      } else {
        if (data.message === 'User not found') {
          toast.error('User not found, Check Your Email and try again')
        } else if (data.message === 'Wrong Password') {
          toast.error('Wrong Password')
        }
      }

    } catch (err) {
      console.error(err);
      alert('Server error. Please try again later.');
    } finally{
      setLoading(false)
    }

  }
  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      <div className='bg-blue-700 w-full lg:w-1/2 h-1/3 lg:h-full flex flex-col justify-center items-center p-6'>
        <div className='flex items-center gap-4'>
          <img src={logo} className='w-16 h-16 rounded-full' alt="TrackHire Logo" />
          <div className='h-10 w-0.5 bg-white'></div>
          <h1 className='text-xl md:text-2xl font-bold text-white'>TrackHire</h1>
        </div>

        <hr className="w-2/3 border-t-2 border-white my-4" />

        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <TbChartCohort className='text-yellow-500 text-xl' />
            <h1 className='text-white text-sm md:text-base'>Application Tracker</h1>
          </div>
          <div className='flex items-center gap-2'>
            <AiFillThunderbolt className='text-yellow-500 text-xl' />
            <h1 className='text-white text-sm md:text-base'>RealTime Update</h1>
          </div>
          <div className='flex items-center gap-2'>
            <RiPlayListAddLine className='text-yellow-500 text-xl' />
            <h1 className='text-white text-sm md:text-base'>Add New Job Application</h1>
          </div>
          <div className='flex items-center gap-2'>
            <IoExtensionPuzzleOutline className='text-yellow-500 text-xl' />
            <h1 className='text-white text-sm md:text-base'>Responsive UI</h1>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-1/2 flex justify-center items-center p-6'>
        <form
          className='flex flex-col items-center justify-center bg-amber-100 w-full max-w-md p-6 md:p-10 rounded-2xl shadow-lg'
          onSubmit={handleLogin}
        >
          <h1 className='text-xl md:text-2xl font-bold'>Login</h1>

          <span className='relative bg-gray-100 rounded-2xl w-full p-3 mt-5'>
            <input
              type='email'
              placeholder='Email'
              className='w-full outline-none bg-transparent'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <MdOutlineAlternateEmail className='absolute right-4 top-4 text-gray-500' />
          </span>

          {showPassword ? (
            <span className='bg-gray-100 rounded-2xl w-full p-3 mt-5 relative'>
              <input
                type='password'
                placeholder='Password'
                className='w-full outline-none bg-transparent'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FaRegEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-4 cursor-pointer text-gray-500'
              />
            </span>
          ) : (
            <span className='bg-gray-100 rounded-2xl w-full p-3 mt-5 relative'>
              <input
                type='text'
                placeholder='Password'
                className='w-full outline-none bg-transparent'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <MdOutlineRemoveRedEye
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-4 top-4 cursor-pointer text-gray-500'
              />
            </span>
          )}

          <button
            className='bg-blue-800 text-white rounded-2xl py-2 px-6 mt-5 cursor-pointer hover:bg-blue-900 transition'
            type='submit'
          >
           {loading ? (<>
           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
           </>):(<>
           LOGIN
           </>)}
          </button>
          {loading && <p className="mt-2 text-gray-500">Please wait...</p>}
      
          <div className='mt-3'>
            <Link to='/forgot-password'>
              <p className='text-sm text-blue-600 hover:underline'>Forget Password ?</p>
            </Link>
          </div>
          <div className='p-3 flex flex-col items-center text-center'>
            <p className='text-sm'>Don't have an account yet?<br /></p>
            <p className='text-sm'>Sign up here for free!</p>
            <Link className='p-3' to='/signup'>
              <p className='text-sm text-blue-600 hover:underline'>REGISTER</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
