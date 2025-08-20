import React from 'react'
import Navbar from '../../HomeScreen/Navbar/Navbar'
import { Link, Navigate } from 'react-router'
import { RiFunctionAddLine } from "react-icons/ri";
import photo from '../../assets/photo.png'
import photo1 from '../../assets/photo1.png'
import photo2 from '../../assets/photo2.png'
import photo3 from '../../assets/photo3.png'
import logo from '../../assets/logo.png'
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaArrowCircleRight } from "react-icons/fa"
import { FaBolt } from "react-icons/fa6";
import { TbChartCohort } from "react-icons/tb";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import heart from '../../assets/love.png'
function LandingPage() {
  const navigate = useNavigate()
  return (
    <div className='overflow-auto'>
    <div className='bg-amber-200 min-h-screen'>
      <nav className='w-full h-15 bg-blue-400 flex items-center justify-center font-bold text-2xl'>
          <h1>Your Job hunt, simplified with <span className=''>TrackHire</span></h1>
      </nav>
      <div className='flex flex-col lg:flex-row'>
        <div>
        <h1 className='text-7xl font-bold text-zinc-600 mt-20 ml-10'>Track Hire</h1>
        <h1 className='text-2xl ml-13 text-emerald-600'>From Application to Offer -- We've Got You</h1>
        <h1 className='ml-13 text mt-5  w-fit p-5 rounded-2xl from-neutral-300 bg-gray-200'>With TrackHire, easily track applications, set remainder,<br/>
          and monitor your progress all in one place. <br/>
          No more lost emails or forgotten<br/>
          follow-ups - just a clear path to your next <br/>
          opportunity.<br/>
          
        </h1>
         <div className='mt-5  bg-red-600 rounded-2xl w-75 p-1 ml-20 cursor-pointer'>
          <Link className='flex items-center justify-center' to='/login'><span className='font-bold  p-1 '>Start Your Journey in One Click</span><span className='hover:scale-200 transition-transform duration-200 ml-2'><FaArrowCircleRight /></span></Link>
         </div>
          
        
      </div>
      <div className="flex-1 flex flex-wrap justify-center items-start gap-2 p-4">
         
        <img src={photo} alt='jobtracking' className='w-64 ml-20 rounded-lg  shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        <img src={photo1} alt='jobtracking1' className='w-64 ml-20 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        
        
          <img src={photo2} alt='jobtracking2' className='w-64 ml-20 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        <img src={photo3} alt='jobtracking3' className='w-64 ml-20 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        </div>
        
      </div>
      
      
    </div>
    <div className='bg-amber-100 px-30 py-30'>
       <h1 className='text-2xl font-bold'>Features</h1>
        <div className='flex items-center gap-60 '>
          <div>
          <div className='bg-blue-800 rounded-2xl w-90 h-48 p-4 mt-10 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 '>
          <div className='flex items-center'>
          <h1 className='text-white font-bold text-lg'>Add New Job Application</h1><span className='ml-20 text-3xl text-yellow-400'><RiFunctionAddLine /></span>
          </div>
          <p className='text-white pt-2 font-light text-s'>Allows users to seamlessly record <br/>
         and manage each job they apply for. <br/>
         With an intuitive and<br/>
          user-friendly form, users can<br/> 
          enter essential job details
          </p>
        </div>
        <div className='bg-blue-800 rounded-2xl w-90 h-48 p-4 mt-10 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'>
          <div className='flex items-center'>
          <h1 className='text-white font-bold text-lg'>Track Application Status</h1><span className='ml-20 text-3xl text-yellow-400'><TbChartCohort /></span>
          </div>
          <p className='text-white pt-2 font-light text-s'>Monitor each job progress <br/>
         i.e Applied, Interview, Offer,  <br/>
         Rejected<br/>
        
          </p>
        </div>
      </div>
        
        <div>
          <div className='bg-blue-800 rounded-2xl w-90  h-48 p-4 mt-10 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'>
          <div className='flex items-center'>
          <h1 className='text-white font-bold text-lg'>Real-Time Updates</h1><span className='ml-30 text-3xl text-yellow-400'><FaBolt /></span>
          </div>
          <p className='text-white pt-2 font-light text-s'>View instant updates when you <br/>
         add, edit, or delete applications  <br/>
         Rejected<br/>
        
          </p>
        </div>
      <div className='bg-blue-800 rounded-2xl w-90 p-4  h-48 mt-10 shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'>
          <div className='flex items-center'>
          <h1 className='text-white font-bold text-lg'>Responsive UI</h1><span className='ml-40 text-3xl text-yellow-400'><IoExtensionPuzzleOutline /></span>
          </div>
          <p className='text-white pt-2 font-light text-s'>Fully responsive design <br/>
                   for seamless use on desktop and   <br/>
         mobile devices<br/>
        
          </p>
        </div>
        </div>
      </div>
      </div>
      <div className='bg-blue-700 px-30 py-30 flex items-center gap-70'>
        
        <div>
          <div>
            <h1 className='text-2xl text-white font-bold'>Get Started</h1>
          </div>
          <div className='p-3'>
            <h1 className='text-white font-bold'>1. Sign Up</h1>
          <p className='text-white'>Create your TrackHire account for free</p>
          </div>
          <div className='p-3'>
            <h1 className='text-white font-bold'>2.Profile Input</h1>
          <p className='text-white'>Input your profile data or import your Linkedin CV<br/>
          to unlock the full potential of job tracker</p>
          </div>
          <div className='p-3'>
            <h1 className='text-white font-bold'>3.Start Applying</h1>
          <p className='text-white'>Manage applications, generate cover letters,<br/>
          create dynamic CVs Effortlessly</p>
          </div>
          
        </div>
          <div className='bg-white rounded-2xl h-110 w-100 '>
            
           <h1 className='text-2xl font-bold mt-18 ml-20'>Register for free &<br/>
           start tracking today</h1>
           <button className='bg-yellow-300 rounded-2xl w-50 p-3 mt-10 ml-23 cursor-pointer' onClick={()=>navigate('/signup')}>Register</button>
           <p className='ml-20 p-7'>Already have an account?</p>
           <Link to='/login' className='text-blue-800 font-semibold ml-43 '>Login</Link>
          </div>
      </div>
      <footer className='bg-white flex gap-20'>
        <div className='pl-4 pt-2 flex flex-col items-center'>
          <img src={logo} className='w-35 h-35 mt-2 p-2 rounded-full'/>
          <h1 className='text-sm font-bold '>Track Every Hire, Simplify Every Step</h1>
            <span className='flex items-center pt-5 pl-6  '>< FaFacebook className='ml-3'/><FaSquareXTwitter className='ml-3' /><FcGoogle className='ml-3' /><FaLinkedin className='ml-3'/></span>
        </div>
          <div className='p-7'>
            <h1 className='font-bold p-2'>Company</h1>
            <h1 className='p-2 text-green-600'>About Us</h1>
            <h1 className='p-2 text-green-600'>Services</h1>
            <h1 className='p-2 text-green-600'>Community</h1>
            <h1 className='p-2 text-green-600'>Testinomial</h1>
          </div>
          <div className='p-7'>
            <h1 className='font-bold p-2'>Support</h1>
            <h1 className='p-2 text-green-600'>Help Center</h1>
            <h1 className='p-2 text-green-600'>Tweet @ Us</h1>
            <h1 className='p-2 text-green-600'>Feedback</h1>
            <h1 className='p-2 text-green-600'>Terms and Condition</h1>
          </div>
          

          <div className='flex flex-col items-center  pt-9 '>
            <div className='flex flex-col items-start justify-start'>
              <h1 className='font-bold'>Contact Us</h1>
               <span className='flex items-center  p-2 '><FaPhoneAlt className='text-blue-800 mr-2'/> <h1 className='text-shadow-md'>123456789</h1></span> 
               <span className='flex items-center p-2 '><IoIosMail className='text-blue-800 mr-2'/><h1 className='text-shadow-md'>support@mail.com</h1></span> 
            </div>
            <div className='flex items-center mt-3'>
            <h1>Made With</h1>
            <img src={heart} className='w-10 '/>
            <h1>By Ayush Rai</h1>
            </div>
             <div className='flex items-center mt-5'>
              <FaRegCopyright size='10'/><h1 className='ml-2 text-sm'>Copyrights All rights reserved</h1>
             </div>
          </div>
          
      </footer>
      
      </div>
      
  )
}

export default LandingPage