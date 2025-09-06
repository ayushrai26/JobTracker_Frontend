import React, { useState,useEffect } from 'react'
import { FaSave } from "react-icons/fa";
import data from '../../assets/data.json'
import { toast } from 'react-toastify';
function PostJob({setValue}) {
  const States = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
  "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
  "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
   const existingJobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const [state,setState]= useState('');
  const [companyName,setCompanyName] = useState('')
  const [city,setCity] = useState('');
  const [jobTitle,setJobTitle] = useState('')
  const [roles,setRoles] = useState(jobTitle)
  const [address,setAddress] = useState('')
  const [etype,setEType] = useState('');
  const [benefits,setBenefits] = useState('');
  const [qualification,setQualification] = useState('');
  const [responsibility,setResponsibility] = useState('');
  const [shifttype,setShiftType] = useState('');
  const [salary,setSalary] = useState(0);
  const [jobSummary,setJobSummary] = useState('');
  const resetForm = () => {
    setState('');
    setCity('');
    setJobSummary('');
    setAddress('');
    setBenefits('');
    setEType('');
    setQualification('');
    setShiftType('');
    setSalary('');
    setResponsibility('');
    setJobTitle('');
    setCompanyName('');
  };
  const handleDraftSave = ()=>{
    alert('saved')
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
     
     const jobData = {
      jobDetails:{
        companyName,jobTitle,roles,address,state,city
      },
      Compensation:{etype,shifttype,salary,benefits},
      jobDescription:{jobSummary,responsibility,qualification}
     }

     try{
      const response =  await fetch('https://jobtracker-backend-ql5b.onrender.com/new-job',{
         method:'POST',
         headers:{
          'Content-Type': 'application/json'
         },
         body:JSON.stringify({jobData})
      })
      const data = await response.json()
      if(response.ok){
        toast.success('Job created successfully')
        setValue(jobData);
        resetForm();
     
      } else{
        toast.error(data.message||'Job creation failed')
      }
     } catch(err){
      console.log(err);
      toast.error('An error occured')
     }
    
     
     
    
  }
  
  return (
     <div className="bg-amber-200 ml-18 mr-2 mt-5 rounded-2xl mb-4 h-full overflow-y-auto px-4 md:px-16">

      
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>Create Job</h1>
        <p className='text-sm'>Define details, budget and outline preferences</p>
      </div>

      <hr className='mx-6 border-gray-100' />
        
      
      <form onSubmit={handleSubmit}>
      <div className='flex flex-col md:flex-row p-6 gap-6'>
        <div className='md:w-1/2'>
          <h1 className='text-l font-medium'>1. Job Details</h1>
          <p className='text-xs'>Please use a descriptive title</p>
        </div>
        <div className='flex flex-col md:w-1/2 gap-4'>
          <label>Company Name</label>
          <input type='text' placeholder='Company Name' className='bg-white rounded-2xl p-2 w-full' value={companyName} onChange={(e)=>setCompanyName(e.target.value)}/>
          <label>Job Title</label>
          <input type='text' placeholder='CNC Lathe' className='bg-white rounded-2xl p-2 w-full' value={jobTitle} onChange={(e)=>{
            setJobTitle(e.target.value);
            setRoles(e.target.value)}
            } required/>
           
          <label>Address</label>
          <input type='text' placeholder='123 Example St' className='bg-white rounded-2xl p-2 w-full' value={address} onChange={(e)=>setAddress(e.target.value)} required />

          <label className="block font-semibold mb-1">State:</label>
      <select
        className="border border-gray-400 p-2 rounded-md w-60"
        onChange={(e) => {
          setState(e.target.value);
          setCity('');
        }}
        value={state}
        required
      >
        <option value="">Select State</option>
        {States.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
          
          {state && (<>
          <label className="block font-semibold mb-1">City:</label>
          <select value={city} onChange={(e)=>setCity(e.target.value)} className="border border-gray-400 p-2 rounded-md w-60" required>
            <option value="">Select City</option>
            {data.states.find((s)=>s.state === state)?.districts.map((districts)=>(
              <option value={districts} key={districts}>{districts}</option>
            ))}
          </select>
          
          </>)}
          
        </div>
      </div>

      <hr className='mx-6 border-gray-100' />

    
      <div className='flex flex-col md:flex-row p-6 gap-6'>
        <div className='md:w-1/2'>
          <h1 className='text-l font-medium'>2. Compensation</h1>
          <p className='text-xs'>Include pay details and benefits/perks your company offers</p>
        </div>
        <div className='flex flex-col md:w-1/2 gap-4'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex flex-col w-full'>
              <label>Employment Type</label>
              <select className='rounded-2xl bg-amber-50 p-2' value={etype} onChange={(e)=>setEType(e.target.value)} required>
                <option value='Part-Time'>Part-Time</option>
                <option value='Full-Time'>Full-Time</option>
                <option value='Internship'>Internship</option>
              </select>
            </div>
            <div className='flex flex-col w-full'>
              <label>Shift Type</label>
              <select className='rounded-2xl bg-amber-50 p-2' value={shifttype} onChange={(e)=>setShiftType(e.target.value)} required>
                <option>Flexible</option>
                <option>Day</option>
                <option>Night</option>
              </select>
            </div>
          </div>

          <div>
            <label>Salary (Monthly)</label>
            <input type='text'  placeholder='Provide the salary range i.e 5k-7k' className='rounded-2xl bg-amber-50 p-2 w-full' value={salary} onChange={(e)=>setSalary(e.target.value)}required />
          </div>

          <div>
            <label>Benefits</label>
            <textarea rows="5" cols="50" placeholder='Enter Benefits' className='bg-amber-50 rounded-2xl p-2 w-full' value={benefits} onChange={(e)=>setBenefits(e.target.value)} required/>
          </div>
        </div>
      </div>

      <hr className='mx-6 border-gray-100' />

  
      <div className='flex flex-col md:flex-row p-6 gap-6'>
        <div className='md:w-1/2'>
          <h1 className='text-l font-medium'>3. Job Description</h1>
          <p className='text-xs' >Include details about the role, responsibilities & qualifications</p>
        </div>
        <div className='flex flex-col md:w-1/2 gap-4'>
          <label>Job Summary</label>
          <textarea rows="4" placeholder='Enter Job Summary' className='bg-amber-50 rounded-2xl p-2 w-full' value={jobSummary} onChange={(e)=>setJobSummary(e.target.value)} required />

          <label>Responsibilities</label>
          <textarea rows="4" placeholder='Enter Responsibilities' className='bg-amber-50 rounded-2xl p-2 w-full' value={responsibility} onChange={(e)=>setResponsibility(e.target.value)} required />

          <label>Qualifications</label>
          <textarea rows="4" placeholder='Enter Qualifications' className='bg-amber-50 rounded-2xl p-2 w-full' value={qualification} onChange={(e)=>setQualification(e.target.value)} required />
        </div>
      </div>

      <hr className='mx-6 border-gray-100' />

    
      <div className='flex flex-wrap justify-end p-6 gap-4'>
        <button className='rounded-xl bg-blue-800 text-white font-bold px-4 py-2 cursor-pointer' type='submit'>+ Post Job</button>
        <button className='rounded-xl bg-white text-black font-bold px-4 py-2 flex items-center cursor-pointer' type='button' onClick={handleDraftSave}>
          <FaSave className='mr-2' /> Save Draft
        </button>
      </div>
      </form>
      
    </div>

  )
}

export default PostJob;
