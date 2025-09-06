import { Link } from 'react-router'
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
    <div className='overflow-x-hidden'>
    <div className='bg-amber-200 min-h-screen'>
      <nav className='w-full h-[60px] bg-blue-400 flex items-center justify-center font-bold text-lg sm:text-2xl px-4 text-center'>
          <h1>Your Job hunt, simplified with <span className=''>TrackHire</span></h1>
      </nav>
      <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 lg:px-20 py-12 bg-amber-200'>
        <div className='flex-1'>
        <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-600'>Track Hire</h1>
        <h1 className='text-xl sm:text-2xl mt-4 text-emerald-600'>From Application to Offer -- We've Got You</h1>
        <h1 className='mt-6 bg-gray-200 p-5 rounded-2xl max-w-xl text-base sm:text-lg'>With TrackHire, easily track applications, set remainder,<br/>
          and monitor your progress all in one place. <br/>
          No more lost emails or forgotten<br/>
          follow-ups - just a clear path to your next <br/>
          opportunity.<br/>
          
        </h1>
         <div className='mt-6 bg-red-600 rounded-2xl w-fit px-6 py-3 cursor-pointer hover:bg-red-700 transition-shadow'>
          <Link className="flex items-center justify-center text-white font-semibold text-base sm:text-lg" to="/login">
              Start Your Journey in One Click
              <span className="ml-2 hover:scale-125 transition-transform duration-200"><FaArrowCircleRight /></span>
            </Link>
         </div>
          
        
      </div>
      <div className="flex-1 grid grid-cols-2 gap-6 justify-items-center mt-10 lg:mt-0 ml-6">
         
        <img src={photo} alt='jobtracking' className='w-56 sm:w-64 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        <img src={photo1} alt='jobtracking1' className='w-56 sm:w-64 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        
        
          <img src={photo2} alt='jobtracking2' className='w-56 sm:w-64 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        <img src={photo3} alt='jobtracking3' className='w-56 sm:w-64 rounded-lg shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-2'/>
        </div>
        
      </div>
      
      
    </div>
    <div className='bg-amber-100 px-6 sm:px-10 lg:px-20 py-16'>
       <h1 className='text-2xl font-bold mb-8'>Features</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
          <div className='bg-blue-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition mb-4 '>
          <div className='flex items-center justify-between'>
          <h1 className='text-white font-bold text-lg'>Add New Job Application</h1><span className='text-yellow-400 text-3xl'><RiFunctionAddLine /></span>
          </div>
          <p className='text-white mt-3 text-sm'>Allows users to seamlessly record <br/>
         and manage each job they apply for. <br/>
         With an intuitive and<br/>
          user-friendly form, users can<br/> 
          enter essential job details
          </p>
        </div>
        <div className='bg-blue-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition'>
          <div className='flex items-center justify-between'>
          <h1 className='text-white font-bold text-lg'>Track Application Status</h1><span className='text-yellow-400 text-3xl'><TbChartCohort /></span>
          </div>
          <p className='text-white mt-3 text-sm'>Monitor each job progress <br/>
         i.e Applied, Interview, Offer,  <br/>
         Rejected<br/>
        
          </p>
        </div>
      </div>
        
        <div>
          <div className='bg-blue-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition mb-4'>
          <div className='flex items-center justify-between'>
          <h1 className='text-white font-bold text-lg'>Real-Time Updates</h1><span className='text-yellow-400 text-3xl'><FaBolt /></span>
          </div>
          <p className='text-white mt-3 text-sm'>View instant updates when you <br/>
         add, edit, or delete applications  <br/>
         Rejected<br/>
        
          </p>
        </div>
      <div className='bg-blue-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition'>
          <div className='flex items-center justify-between'>
          <h1 className='text-white font-bold text-lg'>Responsive UI</h1><span className='text-yellow-400 text-3xl'><IoExtensionPuzzleOutline /></span>
          </div>
          <p className='text-white mt-3 text-sm'>Fully responsive design <br/>
                   for seamless use on desktop and   <br/>
         mobile devices<br/>
        
          </p>
        </div>
        </div>
      </div>
      </div>
      <div className='bg-blue-700 px-6 sm:px-10 lg:px-20 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-20'>
        
        <div className='flex-1 text-white'>
          
            <h1 className='text-2xl font-bold mb-6'>Get Started</h1>
          
          <div className='mb-4'>
            <h2 className='font-bold'>1. Sign Up</h2>
          <p>Create your TrackHire account for free</p>
          </div>
          <div className='mb-4'>
            <h2 className='font-bold'>2.Profile Input</h2>
          <p>Input your profile data or import your Linkedin CV<br/>
          to unlock the full potential of job tracker</p>
          </div>
          <div >
            <h1 className=' font-bold'>3.Start Applying</h1>
          <p >Manage applications, generate cover letters,<br/>
          create dynamic CVs Effortlessly</p>
          </div>
          
        </div>
          <div className='bg-white rounded-2xl shadow-xl flex-1 max-w-md p-8 text-center '>
            
           <h1 className='text-2xl font-bold mb-6'>Register for free &<br/>
           start tracking today</h1>
           <button className='bg-yellow-300 rounded-2xl w-full py-3 font-semibold hover:bg-yellow-400 transition' onClick={()=>navigate('/signup')}>Register</button>
           <p className='mt-6'>Already have an account?</p>
           <Link to='/login' className='text-blue-800 font-semibold '>Login</Link>
          </div>
      </div>
      <footer className='bg-white flex flex-col md:flex-row justify-between items-center md:items-start px-6 sm:px-10 lg:px-20 py-10 gap-10'>
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <img src={logo} className='w-20 h-20 rounded-full mb-3'/>
          <h1 className='text-sm font-bold '>Track Every Hire, Simplify Every Step</h1>
            <span className='flex items-center justify-center md:justify-start gap-4 mt-4 text-xl  '>< FaFacebook className='ml-3'/><FaSquareXTwitter className='ml-3' /><FcGoogle className='ml-3' /><FaLinkedin className='ml-3'/></span>
        </div>
          <div className='font-bold mb-3'>
            <h1 className='space-y-2 text-black'>Company</h1>
            <h1 className='p-2 text-green-600'>About Us</h1>
            <h1 className='p-2 text-green-600'>Services</h1>
            <h1 className='p-2 text-green-600'>Community</h1>
            <h1 className='p-2 text-green-600'>Testinomial</h1>
          </div>
          <div className='font-bold mb-3'>
            <h1 className='space-y-2 text-black'>Support</h1>
            <h1 className='p-2 text-green-600'>Help Center</h1>
            <h1 className='p-2 text-green-600'>Tweet @ Us</h1>
            <h1 className='p-2 text-green-600'>Feedback</h1>
            <h1 className='p-2 text-green-600'>Terms and Condition</h1>
          </div>
          

          <div className='text-center md:text-left'>
            <div className='flex flex-col items-start justify-start'>
              <h1 className='font-bold'>Contact Us</h1>
               <span className='flex items-center mt-2 '><FaPhoneAlt className='text-blue-800 mr-2'/> <h1 className='text-shadow-md'>123456789</h1></span> 
               <span className='flex items-center mt-2 '><IoIosMail className='text-blue-800 mr-2'/><h1 className='text-shadow-md'>support@mail.com</h1></span> 
            </div>
            <div className='flex items-center mt-3'>
            <h1>Made With</h1>
            <img src={heart} className='w-10 '/>
            <h1>By Ayush Rai</h1>
            </div>
             <div className='flex items-center mt-4 text-sm'>
              <FaRegCopyright size='10'/><h1 className='ml-2 text-sm'>Copyrights All rights reserved</h1>
             </div>
          </div>
          
      </footer>
      
      </div>
      
  )
}

export default LandingPage