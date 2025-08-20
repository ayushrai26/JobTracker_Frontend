import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import logo from '../../assets/logo.png'
import { GoTriangleUp } from "react-icons/go"
import { GoTriangleDown } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

import { toast } from 'react-toastify';
import { SearchedJobContext } from '../../ContextAPI/SearchedJobs/CreateContext';
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate()
  const [applied,setApplied] = useState(0);
  const [profileOpened,setProfileOpened] = useState(false);
  const [editProfile,setEditProfile] = useState(false)
 const [fullName,setFullName] = useState('')
  const [email,setEmail] = useState('');
  const [mobileNumber,setMobileNumber] = useState(null);
  const [gender,setGender] = useState('');
  const [jobTitle,setJobTitle] = useState('')
  const [preview,setPreview] = useState('')
  const [userName,setUserName] = useState('')
  const [query,setQuery] = useState('')
  const [profileUdpated,setProfileUpdated] = useState(false)
  const {suggestion,setSuggestion} = useContext(SearchedJobContext);
const[editProfileButton,setEditProfileButton] = useState(false)
  const {searchedJob,setSearchedJob} = useContext(SearchedJobContext)
  const user = JSON.parse(localStorage.getItem('user'))
  

  useEffect(()=>{
     const Applied = async()=>{
    try{
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/user-applied-applications',{
        headers:{
          "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json();
      
      setApplied(data.jobsUserApplied.length);
    }catch(err){
      console.log('An error occured',err)
    }
  }
  Applied();
  },[])
  const handleSave = async()=>{
    
      setEditProfileButton(prev=>!prev)
      const formData = {fullName,email,MobileNumber:mobileNumber,Gender:gender,JobTitle:jobTitle}
      try{

       const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/edit-profile',{
        method:'PUT',
        headers:{
          'content-Type':'application/json'
        },
        body:JSON.stringify(formData)
       })
       const data = await response.json()
       console.log(data)
       
       if(response.ok){
        setUserName(data.updatedUser.fullName)
       setJobTitle(data.updatedUser.jobTitle)
       setGender(data.updatedUser.gender?.toLowerCase())
       setMobileNumber(data.updatedUser.mobileNumber)
       setEmail(data.updatedUser.email)
       setProfileUpdated(prev=>!prev)
        
        toast.success('Profile Updated')
       }else{
        toast.error('Error Updating Profile')
       }
      }catch(err){
        console.log(err)
      }

  }
  const getHeading = (path) => {
    if(path.startsWith('/jobs/')&&(path.endsWith('/apply'))) return 'Apply Job'
    switch (path) {
      case '/dashboard': return 'Dashboard';
      case '/admin/dashboard':return 'Admin Dashboard'
      case '/admin/post-job': return 'Post Job';
      case '/inbox': return 'Inbox';
      case '/jobs': return 'Jobs';
      case '/jobs/filter-jobs':return 'Filtered Jobs'
      
      default: return 'Welcome';
    }
  };
  console.log(location)
  
  useEffect(() => {
    if(!query.trim()){
      setSuggestion([]);
      return ;
    }
    
  const timeoutId = setTimeout(async () => {
    try {
      const response = await fetch(`https://jobtracker-backend-ql5b.onrender.com/jobs/search-jobs?search=${query}`);
      
      const data = await response.json();
      console.log(data)
      setSuggestion(data);
      setSearchedJob(data);
    } catch (err) {
      console.log(err);
    }
  }, 300);

  
  return () => clearTimeout(timeoutId);
}, [query]);
useEffect(() => {
  setSuggestion([]);
  setQuery('');
}, [location.pathname]);

useEffect(()=>{

     const fetchPersonalInfo = async()=>{
      try{
        const userId = JSON.parse(localStorage.getItem('user'));
        const response =  await fetch(`https://jobtracker-backend-ql5b.onrender.com/personalinfo/${userId.id}`)
        const data = await response.json();
        console.log(data);
        setUserName(data.existingUser.fullName)
        setFullName(data.existingUser.fullName)
       setJobTitle(data.existingUser.jobTitle)
       setGender(data.existingUser.Gender?.toLowerCase())
       setMobileNumber(data.existingUser.MobileNumber)
       setEmail(data.existingUser.email)
       setJobTitle(data.existingUser.JobTitle)
       setEditProfile(!editProfile)

      }catch(err){
        console.log('error')
      }
      
     }
     fetchPersonalInfo();
},[profileUdpated])


useEffect(()=>{

  const fetchUserProfileUrl = async()=>{
      
     try{
    const user  = JSON.parse(localStorage.getItem('user'))
   const response  = await fetch(`https://jobtracker-backend-ql5b.onrender.com/personalinfo/${user.id}`)  
   const data =  await response.json();
   console.log('urlData',data)
   setPreview(data.existingUser.userProfilePicUrl)

   }catch(err){
    console.log(err)
   }

  }
  fetchUserProfileUrl()
  
},[preview])
  useEffect(()=>{
        const user =JSON.parse( localStorage.getItem('user'))
        setUserName(user.fullName)

       const profile_pic = localStorage.getItem('file_upload')
       setPreview(profile_pic)
  },[])
   const handleImageUpload =async (e)=>{
      const file = e.target.files[0];
      if(!file) return;
      const formData = new FormData();
      
      formData.append('image',file)
      

      try {
    const res = await fetch('https://jobtracker-backend-ql5b.onrender.com/upload/user-profile-pic', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log('cloudinary',data)
    if (res.ok) {
      console.log('Uploaded image URL:', data.secure_url);
      setPreview(data.secure_url); 
const response =    await fetch(`https://jobtracker-backend-ql5b.onrender.com/save-profile-pic/${user.id}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ userProfilePicUrl: data.secure_url })
})
      console.log('profilepicuploaed',response)

      if(response.ok){
           toast.success('Image Uploaded successfully')
      }else{
        toast.error('Upload failed')
      }
      
      
    } else {
      toast.error('Upload failed');
    }
  } catch (err) {
    console.error('Error uploading image:', err);
  }
   }

  return (
    <div className="bg-blue-100 h-14 flex items-center justify-between px-6 py-6 ml-18 mt-4 mb-2 mr-7 rounded-xl shadow-[8px_8px_15px_#b8c2cc,_-8px_-8px_15px_#ffffff]">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
        <Link to='/'>
          <h1 className="text-2xl font-black text-gray-800 hover:scale-105 transition-transform duration-200">
            <span className="text-amber-500">Track</span>Hire
          </h1>
        </Link>
      </div>

      {/* Route Heading */}
      <h2 className="text-xl font-semibold text-gray-700">{getHeading(location.pathname)}</h2>

      {/* Search Bar */}
      <div className='relative w-full max-w-sm'>
      <div className="flex items-center bg-white rounded-2xl px-3 py-1 w-full  shadow-sm">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full outline-none text-sm pl-2"
          value ={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <CiSearch className="text-gray-500" />
        
      </div>
      
      {query.trim() &&(
        <ul className="absolute bg-white rounded shadow-md mt-1 ml-5 max-h-60 overflow-auto w-full">
      {suggestion.length > 0 ? (
        suggestion.map((value, index) => (
          <li
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              const searchedValue = value.jobDetails.jobTitle;
              setQuery(value.jobDetails.jobTitle);
              setSuggestion([]);
              navigate(`/jobs/searched-job/search/${searchedValue}`);
            }}
          >
            {value.jobDetails.jobTitle}
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500 italic">No jobs found</li>
      )}
    </ul>

      )}
          
       </div> 
    
      

  
      <div className="flex items-center gap-4 relative z-10 ">
        <div >
          <div className="flex items-center gap-2  p-1 w-auto rounded-2xl cursor-pointer" >
            <div className="rounded-full bg-gray-300  w-10 h-10 border-amber-50"><img src={preview ||null} className='object-fill w-10 h-10 rounded-full'/></div>
          <span className="text-sm font-bold">{userName}</span>
          {user.role === 'user'&&(<>
           {!profileOpened?<GoTriangleUp onClick={()=>setProfileOpened(prev=>!prev)} />:
          <div className='flex flex-col'>
            <GoTriangleDown onClick={()=>setProfileOpened(prev=>!prev)} />
            <div className=' fixed left-1/4 top-10 bg-gray-200 w-3/5 h-9/10 rounded-2xl shadow-2xl flex  '>
            <IoMdClose className='fixed right-50 top-13 bg-white rounded-full' onClick={()=>setProfileOpened(prev=>!prev)}  />
            <div className='bg-amber-500 w-1/2 rounded-2xl m-3 shadow-2x flex flex-col items-center'>
            <div className='rounded-full bg-amber-50 w-60 h-60 mt-3'>
              {preview && <img src={preview || null} className='w-full h-full rounded-full object-fill '/>}
            </div>
              <input type='file' accept='image/*' className='bg-blue-900 rounded-3xl p-2 text-white w-50 mt-2' onChange={handleImageUpload}/>
              <h1 className='font-bold mt-2'>{userName}</h1>
              <p className='text-sm'>{jobTitle}</p>
              <div className='flex flex-col mt-4 w-full'>
                <span className='flex justify-between ml-10 mr-10 p-2 bg-amber-50 rounded-2xl mt-1 mb-1'><h1>Applied</h1><h1>{applied}</h1></span>
                 <span className='flex justify-between ml-10 mr-10 p-2  bg-amber-50 rounded-2xl mt-1 mb-1'><h1>Interviews</h1><h1>0</h1></span>
                 <span className='flex justify-between ml-10 mr-10 p-2  bg-amber-50 rounded-2xl mt-1 mb-1'><h1>Offers</h1><h1>0</h1></span>
              </div>
             
            </div>
              <div className='w-1/2 '>
                 <h1 className='font-bold mt-4'>Personal Information</h1>
                 {!editProfile?<>
                 <form  >
                 <div className='flex justify-between mt-4 p-2 bg-amber-50 rounded-2xl mr-2'>
                  <label htmlFor='fullname'>Name</label>
                  <input type='text' placeholder='Full Name' id='fullname'  className='outline-none' value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-amber-50 rounded-2xl mr-2'>
                  <label htmlFor='email'>Email</label>
                  <input type='text' placeholder='Email' id='email' className='outline-none' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-amber-50 rounded-2xl mr-2'>
                  <label htmlFor='mob'>Mobile Number</label>
                  <input type='text' id='mob' placeholder='Mobile Number' className='outline-none' value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}/>
                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-amber-50 rounded-2xl mr-2'>
                  <label htmlFor='gender'>Gender</label>
                  <select className='outline-none mr-14' id='gender' value={gender} onChange={(e)=>setGender(e.target.value)}><option value=''>Choose gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
                  </select>
                   
                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-amber-50 rounded-2xl mr-2'>
                  <label htmlFor='jt'>Job Title</label><input type='text' placeholder='JOb Title' id='jt' value={jobTitle} onChange={(e)=>setJobTitle(e.target.value)} className='outline-none'/>
                 </div>
                 </form>
                 
                
                 </>:<> 
                 <div className='flex justify-between mt-4 p-2  rounded-2xl mr-2 bg-gray-300'>
                  <label>Name</label><input type='text' placeholder='Full Name' className='outline-none cursor-not-allowed ' value={fullName}  disabled/>
                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-gray-300 rounded-2xl mr-2'>
                  <label>Email</label><input type='text' placeholder='Email' className='outline-none cursor-not-allowed ' value={email}disabled/>
                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-gray-300 rounded-2xl mr-2'>
                  <label>Mobile Number</label><input type='text' placeholder='Mobile Number' className='outline-none cursor-not-allowed' value={mobileNumber}disabled/>
                 </div>
                 
                 <div className='flex justify-between mt-4 p-2  bg-gray-300 rounded-2xl mr-2 '>
                  <label>Gender</label><select className='outline-none cursor-not-allowed mr-14 ' value={gender} disabled ><option value=''>Choose gender</option>
                  <option value='male' >Male</option>
                  <option value='female' >Female</option>
                  <option value='other'>Other</option>
                  </select>

                 </div>
                 <div className='flex justify-between mt-4 p-2  bg-gray-300 rounded-2xl mr-2'>
                  <label>Job Title</label><input type='text' placeholder='JOb Title' className='outline-none cursor-not-allowed' value={jobTitle}/>
                 </div></>}
                 {!editProfileButton?
                 
                 <button className='p-2 rounded-2xl w-1/2 bg-blue-950 mt-5 text-white cursor-pointer' onClick={()=>{
                  setEditProfileButton(prev=>!prev)
                  setEditProfile(prev=>!prev)
                }} >Edit</button>:
                 <button className='p-2 rounded-2xl w-1/2 bg-blue-950 mt-5 text-white cursor-pointer' type='button' onClick={handleSave}>Save</button>}
              </div>
            </div>    
            </div>}
          </>)}
         
          </div>
          
        </div>
        
      </div>
    </div>
  );
}

export default Navbar;
