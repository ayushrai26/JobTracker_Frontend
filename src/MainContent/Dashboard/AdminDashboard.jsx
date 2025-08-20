import React, { useContext, useEffect } from 'react'
import { UserCheck } from 'lucide-react';
import { useState } from 'react';
import { IoDocumentOutline } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { LaptopMinimalCheck } from 'lucide-react';
import { SatelliteDish } from 'lucide-react';
import { MdOutlineUpcoming } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import {  useNavigate } from 'react-router';
import AdminChart from './AdminChart'
import { CalendarCheck2 } from 'lucide-react';
import { X } from 'lucide-react';
import { MiscFunctionality } from '../../ContextAPI/Misc/createContext';
import { ClipboardClock } from 'lucide-react';
function AdminDashboard() {
  const [jobs,setJobs] = useState(0)
  const [applied,setApplied] = useState(0)
  
  const [ appliedApplication,setAppliedApplication] = useState([])
  const [isActive,setIsActive] = useState('')
const {applicationStatus,setApplicationStatus,shortlistedCandidate,
  setShortlistedCandidate,interviewScheduledCandidates,setInterviewScheduledCandidates,
selectedCandidates,setSelectedCandidates,interviewedCandidates,setInterviewedCandidates,
rejectedCandidates,setRejectedCandidates,underReviewCandidates,setUnderReviewCandidates} = useContext(MiscFunctionality)
   const navigate = useNavigate()
   const [lastUpdated,setLastUpdated] = useState(null)

  useEffect(()=>{
      const fetchAllJobs =async()=>{
      try{
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-all-jobs')
        const data = await response.json()
        
        setJobs(Array.isArray(data.jobs)?data.jobs.length:0)
      }catch(err){
         console.log(err)
         
      }
    }
    
    const allAppliedJobs = async()=>{
      try{
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/all-applied-applications')
        const data = await response.json();
    
        setAppliedApplication(Array.isArray(data.allApplication)?data.allApplication:[])
        setApplied(Array.isArray(data.allApplication)?data.allApplication.length:0);
      }catch(err){
        console.log(err)
      
    }
     
  }
  

fetchAllJobs();
allAppliedJobs()
},[])

const fetchApplicationStatus = async()=>{
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-application-status')
      const data = await response.json();
      console.log('applicationStatus',data)
    const statusMap = data.reduce((acc, { jobId, status }) => {
        acc[jobId] = status;
        return acc;
      }, {});

      setApplicationStatus(statusMap);
      
    }
  
    const fetchForShortlistedCandidate = async()=>{
                const response =   await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-shortlisted-candidate')
                const data = await response.json()
                console.log(data.shortlistedCandidate)
                setShortlistedCandidate(data.shortlistedCandidate)
                
    }
    
      const fetchInterviewScheduledCandidates = async()=>{
        const response  = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-interview-scheduled-candidates')
        const data = await response.json()
        console.log('InterviewScheduledcanddiates',data.InterviewScheduledCandidates)
    
        setInterviewScheduledCandidates(data.InterviewScheduledCandidates)
      }
      
const fetchInterviewedCandidates = async()=>{
  const response  = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-interviewed-candidates')
  const data = await response.json()
  setInterviewedCandidates(data.InterviewedCandidates)
}
const fetchSelectedCandidates = async()=>{
  const response  = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-selected-candidates')
  const data = await response.json()
  setSelectedCandidates(data.SelectedCandidates)
}
const fetchRejectedCandidates = async()=>{
  const response  = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-rejected-candidates')
  const data = await response.json()
  setRejectedCandidates(data.RejectedCandidates)
}
const fetchUnderReviewCandidates = async()=>{
  const response  = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-under-review-candidates')
  const data = await response.json()
  setUnderReviewCandidates(data.UnderReviewCandidates)
}
useEffect(()=>{
  if(lastUpdated){
    const saveApplicationStatus = async () => {
      const {jobId,status,userId} = lastUpdated
    try {
         
      await fetch(`https://jobtracker-backend-ql5b.onrender.com/admin/save-application-status/${jobId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({status,
          userId

        }) 
        
      });

      await fetchApplicationStatus();
        await fetchForShortlistedCandidate();
        await fetchInterviewScheduledCandidates();
        await fetchInterviewedCandidates();
        await fetchSelectedCandidates();
        await fetchRejectedCandidates();
        await fetchUnderReviewCandidates();

    } catch (err) {
      console.error("Error saving status:", err);
    }
  };
   saveApplicationStatus()
  }
  
 
},[lastUpdated])

useEffect(() => {
  const fetchAllData = async () => {
    await fetchApplicationStatus();
    await fetchForShortlistedCandidate();
    await fetchInterviewScheduledCandidates();
    await fetchInterviewedCandidates();
        await fetchSelectedCandidates();
        await fetchRejectedCandidates();
        await fetchUnderReviewCandidates();

  };

  fetchAllData();
}, []); 


  
   
const handleJobPosted = ()=>{
  
  navigate('/jobs')
}
  return (
    <div>
      <div className='flex flex-col'>
    <div className='flex w-fullh-full overflow-y-auto px-4 md:px-25'>
      <div className='bg-blue-700 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-blue-500 hover:scale-110 cursor-pointer' 
      onClick={ handleJobPosted}
      >
    <span className='p-1 text-white'><IoDocumentOutline /></span>
    <span className='text-white font-bold p-1'>Jobs Posted</span>
    <span className='text-white font-bold p-1'>{jobs}</span>
    </div>
    
      <div className='bg-yellow-500 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-yellow-300 hover:scale-110 cursor-pointer' 
      onClick={()=>setIsActive('Application Received')}>
    <span className='p-1 text-white'><SatelliteDish /></span>
    <span className='text-white font-bold p-1'>Application Received</span>
    <span className='text-white font-bold p-1'>{applied}</span>
    </div>

    <div className='bg-orange-500 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-orange-300 hover:scale-110 cursor-pointer' 
    onClick={()=>setIsActive('Shortlisted Candidate')}>
    <span className='p-1 text-white'><FaCheckCircle /></span>
    <span className='text-white font-bold p-1'>Shortlisted Candidates</span>
    <span className='text-white font-bold p-1'>{shortlistedCandidate.length}</span>
    </div>
    <div className='bg-green-500 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer' 
    onClick={()=>setIsActive('Interview Scheduled')}>
    <span className='p-1 text-white'>< CalendarCheck2 /></span>
    <span className='text-white font-bold p-1'>Interviews Scheduled</span>
    <span className='text-white font-bold p-1'>{interviewScheduledCandidates.length}</span>
    </div>   
    </div>
  <div className='flex w-fullh-full overflow-y-auto px-4 md:px-25'>
    <div className='bg-amber-600 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer' 
    onClick={()=>setIsActive('Interviewed')}>
    <span className='p-1 text-white'><LaptopMinimalCheck /></span>
    <span className='text-white font-bold p-1'>Interviewed Candidates</span>
    <span className='text-white font-bold p-1'>{interviewedCandidates.length}</span>
    </div>
    <div className='bg-green-800 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer' 
    onClick={()=>setIsActive('Selected')}>
    <span className='p-1 text-white'><UserCheck /></span>
    <span className='text-white font-bold p-1'>Selected Candidates</span>
    <span className='text-white font-bold p-1'>{selectedCandidates.length}</span>
    </div>
    <div className='bg-red-600 h-28 w-55 m-3 flex flex-col p-3 rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer' 
    onClick={()=>setIsActive('Rejected')}>
    <span className='p-1 text-white'><X /></span>
    <span className='text-white font-bold p-1'>Rejected Candidates</span>
    <span className='text-white font-bold p-1'>{rejectedCandidates.length}</span>
    </div>
    <div className='bg-amber-200 h-28 w-55 m-3 flex flex-col p-4 rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer' 
    onClick={()=>setIsActive('Under Review')}>
    <span className='p-1 text-white'><ClipboardClock /></span>
    <span className='text-white font-bold p-1'>Under Review</span>
    <span className='text-white font-bold p-1'>{underReviewCandidates.length}</span>
    </div>
    
  </div>

    
    
    
    
    
    <div className='ml-18 flex flex-col items-center justify-center mt-8'>
      {isActive==='Application Received'&&(
        <>
        <h1 className='text-2xl shadow-amber-400'>Applications</h1>
        <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
          <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
          <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>
          <th className='px-6 py-3 border-b'>Resume</th>
          <th className='px-6 py-3 border-b'>Application Status</th>
         </tr>
          </thead>
          <tbody>
           {appliedApplication.length>0?(<>
           {appliedApplication.map((application,index)=>(
              <tr key={index}>
          <td className='px-6 py-3 border-b'>{application.name}</td>
          <td className='px-6 py-3 border-b'>{application.skill}</td>
          <td className='px-6 py-3 border-b'>{application.company}</td>
          <td className='px-6 py-3 border-b'> {application.resume ? (
    <a 
      href={application.resume} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      View Resume
    </a>
  ) : (
    "No Resume"
  )}</td>
          <td className='px-6 py-3 border-b'>
            <select value={applicationStatus[application._id] || ''} onChange={(e)=>{
            const newStatus = e.target.value
              setApplicationStatus(prev=>({...prev,
                [application._id]:newStatus
              }))
               setLastUpdated({ jobId: application._id, status: newStatus,userId:application.userId });
            }}>
              <option value='' disabled  hiddden >Select Application Status</option>
            <option value='Application Received'>Appliation Received</option>
            <option value='under review'>Under Review</option>
            <option value='shortlisted'> Shortlisted</option>
            <option value='Interview scheduled'>Interview Scheduled</option>
            <option value='interviewed'>Interviewed</option>
            <option value='selected'>Selected</option>
            <option value='reject'>Rejected</option></select></td>
         </tr>
           ))}
           </>):(<>
           {<h1>No Applied Jobs </h1>}
           </>)}
          </tbody>
          
         </table>
         </div>
        </>
      )}
    </div>
    <div className='ml-18 flex flex-col items-center justify-center mt-4'>
      {isActive === 'Shortlisted Candidate'&&(<>
      <h1 className='text-2xl shadow-amber-200'>Shortlisted Candiates</h1>
      <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
        <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
            <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>  
          </tr>
        </thead>
        <tbody>
          {shortlistedCandidate.length>0?(<>
          {shortlistedCandidate.map((shortlisted,index)=>(
             <tr key={index}>
              {shortlisted.shortlistedCandidate.map((candidate,index)=>(
                <>
                <td className='px-6 py-3 border-b'>{candidate.name}</td>
                <td className='px-6 py-3 border-b'>{candidate.skill}</td>
                <td className='px-6 py-3 border-b'>{candidate.company}</td>
                </>
                
              ))}               
             </tr>            
          ))}          
          </>):(<>
          <h1>No shortlisted Candidate</h1>
          </>)}
        </tbody>       
      </table>
      </div>   
      </>)}
    </div>
    <div className='ml-18 flex flex-col items-center justify-center mt-1'>
    {isActive === 'Interview Scheduled'&&(<>
    <h1 className='text-2xl'>Scheduled Interviews</h1>
      <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
        <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
            <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>  
          </tr>
        </thead>
        <tbody>
         {interviewScheduledCandidates.length>0?(<>
           {interviewScheduledCandidates.map((candidates,index)=>(<tr key={index}>
              {candidates.InterviewScheduledCandidates.map((eachCandidate,index)=>(
                <>
                 <td className='px-6 py-3 border-b'>{eachCandidate.name}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.skill}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.company}</td>
                </>
              ))}
           </tr>))}
         </>):(<>  
          <h1 className='font-bold'>No candidates for Interview</h1>         
         </>)}
        </tbody>
      </table>
      </div>
      </>)}
  </div>
   <div className='ml-18 flex flex-col items-center justify-center mt-1'>
         {isActive === 'Interviewed'&&(<>
         <h1 className='text-2xl'>Interviewed Candidates</h1>
      <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
        <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
            <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>  
          </tr>
        </thead>
        <tbody>
         {interviewedCandidates.length>0?(<>
           {interviewedCandidates.map((candidates,index)=>(<tr key={index}>
              {candidates.InterviewedCandidates.map((eachCandidate,index)=>(
                <>
                 <td className='px-6 py-3 border-b'>{eachCandidate.name}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.skill}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.company}</td>
                </>
              ))}
           </tr>))}
         </>):(<>  
          <h1 className='font-bold'>No candidates for Interview</h1>         
         </>)}
        </tbody>
      </table>
      </div>

         </>)}
  </div>
  <div className='ml-18 flex flex-col items-center justify-center mt-1'>
    {isActive === 'Selected'&&(<>
    <h1 className='text-2xl'>Selected Candidates</h1>
      <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
        <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
            <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>  
          </tr>
        </thead>
        <tbody>
         {selectedCandidates.length>0?(<>
           {selectedCandidates.map((candidates,index)=>(<tr key={index}>
              {candidates.SelectedCandidates.map((eachCandidate,index)=>(
                <>
                 <td className='px-6 py-3 border-b'>{eachCandidate.name}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.skill}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.company}</td>
                </>
              ))}
           </tr>))}
         </>):(<>  
          <h1 className='font-bold'>No Selected Candidates</h1>         
         </>)}
        </tbody>
      </table>
      </div>
    </>)}
  </div>
  <div className='ml-18 flex flex-col items-center justify-center mt-1'>
    {isActive === 'Rejected'&&(<>
    <h1 className='text-2xl'>Rejected Candidates</h1>
      <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
        <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
            <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>  
          </tr>
        </thead>
        <tbody>
         {rejectedCandidates.length>0?(<>
           {rejectedCandidates.map((candidates,index)=>(<tr key={index}>
              {candidates.RejectedCandidates.map((eachCandidate,index)=>(
                <>
                 <td className='px-6 py-3 border-b'>{eachCandidate.name}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.skill}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.company}</td>
                </>
              ))}
           </tr>))}
         </>):(<>  
          <h1 className='font-bold'>No Rejected Candidates</h1>         
         </>)}
        </tbody>
      </table>
      </div>
    </>)}
  </div>
  <div className='ml-18 flex flex-col items-center justify-center mt-1'>
    {isActive === 'Under Review'&&(<>
    <h1 className='text-2xl'>Under Review Candidates</h1>
      <div className='overflow-x-auto overflow-y-auto rounded-lg shadow-lg mt-4'>
        <table className='min-w-full border border-gray-200 bg-white text-m text-left'>
        <thead className='bg-gray-100 text-gray-700 uppercase text-sm text-left'>
          <tr>
            <th className='px-6 py-3 border-b'>Applicant's Name</th>
          <th className='px-6 py-3 border-b'>Position Applied for</th>
          <th className='px-6 py-3 border-b'>Company</th>  
          </tr>
        </thead>
        <tbody>
         {underReviewCandidates.length>0?(<>
           {underReviewCandidates.map((candidates,index)=>(<tr key={index}>
              {candidates.UnderReviewCandidates.map((eachCandidate,index)=>(
                <>
                 <td className='px-6 py-3 border-b'>{eachCandidate.name}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.skill}</td>
                <td className='px-6 py-3 border-b'>{eachCandidate.company}</td>
                </>
              ))}
           </tr>))}
         </>):(<>  
          <h1 className='font-bold'>No candidates Under Review</h1>         
         </>)}
        </tbody>
      </table>
      </div>
    </>)}
  </div>









  <div>
    {isActive ===''&&(<>
    <AdminChart/>
    </>)}
    
  </div>
  
    </div>
    </div>
  )
}

export default AdminDashboard