import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { CircleCheckBig } from 'lucide-react';
function Cards({ job }) {
  

  const [appliedButton,setAppliedButton] = useState(null)
   if (!job || !job._id) return null;
   
   const [isBookmarked,setIsBookmarked] = useState(null)
  const jobTitle =  job?.jobDetails?.jobTitle || job.jobTitle;
  const companyName  = job?.jobDetails?.companyName || job.companyName;
  const eType = job?.Compensation?.etype || job.etype;
  const state = job?.jobDetails?.state || job.state;
  const city = job?.jobDetails?.city || job.city;
  const salary = job?.Compensation?.salary || job.salary;
  const shifttype = job?.Compensation?.shifttype || job.shifttype
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
useEffect(()=>{
  const isJobApplied = async()=>{
    try{
         const response =  await fetch('http://localhost:3000/isAppliedJob',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({jobId:job._id,userId:user.id})
            })
            const data = await response.json()
            console.log('applieddata',data)
            
            if(!data.jobExist){
              setAppliedButton(false)
            }else{
              setAppliedButton(true)
            }
  }catch(err){
     console.log('err',err)
  }
  }
  isJobApplied()
},[])


   const deleteBookmark = async()=>{
    
    try{

    const response = await fetch('http://localhost:3000/delete/bookmarked/job', {
          method: 'DELETE',
          headers:{
            "Content-Type": "application/json",
            "Authorization":`Bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify({jobId:job._id})
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Delete failed');
        } else {
          toast.success('Bookmark deleted successfully');
          setIsBookmarked(false);
        }
      
    } catch (err) {
      toast.error('❌ Error updating bookmark');
      console.error(err);
    }
  };
   

   const saveBookmark = async()=>{
    
     try {
      
        // Save bookmark
        const response = await fetch('http://localhost:3000/bookmark-jobs', {
          method: 'POST',
          headers: { 'content-Type': 'application/json' },
          body: JSON.stringify({
            userId:user.id,
            jobDetails: {
              jobId: job._id,
              companyName: job.companyName,
              jobTitle: job.jobTitle,
              address: job.address || "Default Address",
              state: job.state,
              city: job.city,
            },
            Compensation: {
              etype: job.etype,
              shifttype: job.shifttype,
              salary: job.salary,
              benefits: job.benefits || ["Default Benefit"],
            },
            jobDescription: {
              jobSummary: job.jobSummary || "Default Summary",
              responsibility: job.responsibility || "Default Responsibility",
              qualification: job.qualification || "Default Qualification",
            },
          }),
        });

        const data = await response.json();
        console.log(data,'bookmarkeddata')
        if(data.message === 'Job is Already bookmarked '){
          toast.info('Already Bookmarked')
        }else if (data.message === 'Job saved successfully'){
             toast.success('Bookmark saved successfully');
              setIsBookmarked(true)
        }
        
   }catch(err){
    console.log(err)
   }

  }

  useEffect(() => {
    const fetchBookmarked = async () => {
      try {
        const response = await fetch("http://localhost:3000/fetch-bookmark-jobs",{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${localStorage.getItem('token')}`
          },
          body:JSON.stringify({jobId:job._id})
        });
        if (!response.ok) throw new Error("Failed to fetch bookmarks");

        const data = await response.json();
        console.log(data,'bookmarkeddata')
        if(Object.keys(data).length===0){
          setIsBookmarked(false)
        }else{
          setIsBookmarked(true)
        }
       
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarked();
  }, []);

  

  return (
    <div className='flex flex-col ml-16 mt-5 mr-5 mb-5 bg-gray-400 p-4 rounded-2xl w-80 hover:bg-gray-300'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='rounded-2xl p-3 w-10 h-10 flex items-center justify-center bg-amber-500 text-white font-bold'>
            {companyName?.charAt(0).toUpperCase()}
          </div>
          <div className='flex flex-col ml-2'>
            <h1 className='font-bold text-lg'>{jobTitle || "Untitled Job"}</h1>
            <p className='font-bold text-sm text-amber-50'>{companyName || "Company"}</p>
          </div>
        </div>

        <div
          className='cursor-pointer bg-amber-50 p-2 rounded-lg ml-2'
          
        >
          {isBookmarked ? (
            <FaBookmark className='text-blue-600' onClick={deleteBookmark} />
          ) : (
            <FaRegBookmark className='text-blue-600' onClick={saveBookmark} />
          )}
        </div>
      </div>

      <div className='flex justify-evenly mt-3 flex-wrap'>
        <p className='bg-amber-50 m-1 rounded-lg px-2 py-1 font-bold text-xs'>{eType || "N/A"}</p>
        <p className='bg-amber-50 m-1 rounded-lg px-2 py-1 font-bold text-xs'>{shifttype || "N/A"}</p>
        <p className='bg-amber-50 m-1 rounded-lg px-2 py-1 font-bold text-xs'>{`${state || ""}, ${city || ""}`}</p>
      </div>

      <hr className='mt-3' />

      <div className='flex justify-between mt-3 items-center'>
        <p className='flex items-center gap-1 text-sm'>
          <AiTwotoneDollarCircle className='text-xl' />
          {salary || "0"} <span className='text-gray-700'>/ Month</span>
        </p>
        

        {appliedButton ? (
  <button
    className="bg-green-600 text-white px-5 py-2 rounded-2xl flex items-center gap-2 cursor-not-allowed"
    disabled
  >
    Applied <CircleCheckBig />
  </button>
) : (
  <button
    className="bg-blue-800 text-white px-5 py-2 rounded-2xl hover:scale-110 transition-transform"
    onClick={() => navigate(`/jobs/${job._id}/apply`)}
  >
    Apply Job
  </button>
)}

      
      </div>
    </div>
  );
}

export default Cards;
