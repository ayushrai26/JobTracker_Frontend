import React from 'react'
import  {  useState,useContext } from 'react';
import { useNavigate } from 'react-router';
import { IoFilter } from "react-icons/io5";
import { FaToggleOff } from "react-icons/fa6";
import { MdOutlineToggleOff } from "react-icons/md";
import { PiToggleLeftLight } from "react-icons/pi"
import { MdToggleOn } from "react-icons/md";
import data from '../../assets/data.json'
import { toast } from 'react-toastify';
import {filteredContext} from '../../ContextAPI/FilteredJobs/createContext.js'
function Filter() {
  const [roles,setRoles] = useState('')
    const [state,setState] = useState('')
    const [city,setCity]  = useState('')
    const [salary,setSalary] = useState(0)
    
   const {setFilterd}   = useContext(filteredContext);
  const navigate = useNavigate();
  const [toggleOn,setToggleOn] = useState(false)
     const [skills,setSkills] = useState('');
     const States = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
    "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"];
    const Skills = ['FullStack','Frontend','Backend',' MobileDevelopment ',' QATesting','DevOps,Cloud,Infra',' Security',
      ' DataAI','ProductManagement','Others'
    ]
    const Roles = [
    {
      category: "FullStack",
      roles: [
        "Full Stack Developer",
        "MERN Stack Developer",
        "MEAN Stack Developer",
        "Java Full Stack Developer",
        "Python Full Stack Developer",
        "PHP Full Stack Developer"
      ]
    },
    {
      category: "Frontend",
      roles: [
        "Frontend Developer",
        "React Developer",
        "Angular Developer",
        "Vue.js Developer",
        "JavaScript Developer",
        "UI Developer",
        "Web Developer"
      ]
    },
    {
      category: "Backend",
      roles: [
        "Backend Developer",
        "Node.js Developer",
        "Java Developer",
        "Python Developer",
        "PHP Developer",
        "Ruby on Rails Developer",
        ".NET Developer",
        "Golang Developer"
      ]
    },
    {
      category: "MobileDevelopment",
      roles: [
        "Mobile App Developer",
        "React Native Developer",
        "Flutter Developer",
        "Android Developer",
        "iOS Developer"
      ]
    },
    {
      category: "QATesting",
      roles: [
        "QA Engineer",
        "SDET (Software Development Engineer in Test)",
        "Automation Tester",
        "Manual Tester",
        "Performance Tester"
      ]
    },
    {
      category: "DevOpsCloudInfra",
      roles: [
        "DevOps Engineer",
        "Cloud Engineer",
        "Site Reliability Engineer (SRE)",
        "AWS Engineer",
        "Azure Engineer",
        "Kubernetes Engineer"
      ]
    },
    {
      category: "Security",
      roles: [
        "Cybersecurity Analyst",
        "Security Engineer",
        "Penetration Tester"
      ]
    },
    {
      category: "DataAI",
      roles: [
        "Data Scientist",
        "Data Analyst",
        "Data Engineer",
        "ML Engineer",
        "AI Engineer",
        "BI Developer"
      ]
    },
    {
      category: "ProductManagement",
      roles: [
        "Product Manager",
        "Project Manager",
        "Scrum Master",
        "Technical Program Manager"
      ]
    },
    {
      category: "Others",
      roles: [
        "Software Engineer",
        "Software Developer",
        "Tech Lead",
        "Intern - Software Development",
        "Junior Developer",
        "Senior Software Engineer"
      ]
    }
  ];
  
      const handleSubmit =async (e)=>{
        e.preventDefault();
        navigate('/jobs/filter-jobs')
        try{
          const response = await fetch('http://localhost:3000/Jobs/filterJobs',{
            method:'POST',
            headers:{
              'content-Type':'application/json'
            },
            body:JSON.stringify({roles,state,city,salary})
          })
          const data = await response.json();
               setFilterd(data)
          if(response.ok){
            toast.success('Filterd jobs ')
          }else{
            toast.error('Error in showing filtered jobs')
          }
        }catch(err){
            toast.error(err)
        }
      }



  return (
    <div className=' ml-18 mb-4 rounded-2xl mt-2 bg-sky-50 '>
      
       <span className='flex items-center justify-center gap-5'><h1 className='ml-5 mt-5 font-bold'>Filter By</h1><span className='mt-5'><IoFilter /></span></span> 
       
        <span className='flex items-center gap-5'><h1 className='text-sm ml-5'>Sort with </h1>
        
        <span className='text-2xl'>{toggleOn?<MdToggleOn onClick={()=>setToggleOn(!toggleOn)} className='text-blue-800 text-3xl'/>
        :<PiToggleLeftLight onClick={()=>setToggleOn(!toggleOn)}/>}</span></span> 
        <form onSubmit={handleSubmit}>
        <div className='flex flex-col mt-4 bg-orange-300 ml-5 p-2  w-4/5 rounded-2xl'>
        <h1 className='font-bold'>Skills</h1>
        <label>Skiils</label>
        <select value={skills} onChange={(e)=>setSkills(e.target.value)}>
          <option>Choose Skills</option>
          {Skills.map((skill,index)=>(
            <option>{skill}</option>
          ))}
          
        </select>
        {skills && (<>
        <label>Roles</label>
        <select value={roles} onChange={(e)=>setRoles(e.target.value)}>
          <option>Choose Roles</option>
          {Roles.find((s)=>s.category ===skills)?.roles.map((role,index)=>(
            <option>{role}</option>
          ))}

        </select>
        </>)}
        </div>
       <span className='flex flex-col bg-orange-300 w-3/4 ml-5 p-3 rounded-2xl mt-4'>
        <label className='font-bold'>Location</label>
        <label>State</label>
        <select  onChange={(e)=>setState(e.target.value)} value={state}>
          <option value='' >Choose State</option>
          {States.map((state)=>(
            <option value={state} key={state}>{state}</option>
          ))}
        </select>
        {state && (
          <>
          <label>City</label>
          <select value={city} onChange={(e)=>setCity(e.target.value)}  >
            <option value=''>Choose city</option>
            {data.states.find((s)=>s.state === state)?.districts.map((districts)=>(
              <option value={districts} key={districts}>{districts}</option>
            ))}
          </select>
          
          
          </>
        )}
        </span>
        <div className=' bg-orange-300 rounded-2xl p-3 ml-5 w-3/4 mt-4'>
        <h1 className='font-bold'>Job Type</h1>
        <span className='flex flex-col'>
         <span className='flex justify-evenly  gap-5'><label>Full time</label> <input type='radio'/></span> 
      <span className='flex justify-evenly  gap-5'><label>Part time</label> <input type='radio'/></span> 
       <span className='flex justify-evenly gap-5'><label>Internship</label> <input type='radio'/></span>
        </span>
        </div>
        <div className=' bg-orange-300 rounded-2xl p-3 ml-5 w-3/4 mt-4'>
       <h1 className='font-bold'>Pay Type</h1>
       <h1>Salary</h1>
       <span>{salary}</span>
       <input type='range' min='0' max='100000' value={salary} onChange={(e)=>setSalary(e.target.value)} step='5000'/>
      
      </div>
         <button className='bg-blue-800 p-2 rounded-2xl ml-14 cursor-pointer text-white mt-4 mb-3 ' type='submit'>Filter</button>
         </form>
      </div>
  )
}

export default Filter