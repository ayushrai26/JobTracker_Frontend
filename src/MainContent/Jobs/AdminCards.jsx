import React from 'react'
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { toast } from 'react-toastify';
function AdminCards({job,setAllJob,setRefreshFlag}) {
    if (!job || !job._id) return null;
    const jobTitle =  job?.jobDetails?.jobTitle || job.jobTitle;
  const companyName  = job?.jobDetails?.companyName || job.companyName;
  const eType = job?.Compensation?.etype || job.etype;
  const state = job?.jobDetails?.state || job.state;
  const city = job?.jobDetails?.city || job.city;
  const salary = job?.Compensation?.salary || job.salary;
  const shifttype = job?.Compensation?.shifttype || job.shifttype
   console.log(job._id)
   const id = job._id;
  const handleDelete = async()=>{
    try{
        
      const response  = await fetch(`http://localhost:3000/admin/delete-job/${job._id}`,{
        method:'DELETE'
      })
      const data = await response.json();
      if(response.ok){
        setAllJob(prev=>prev.filter((job)=>job._id!==id))
        setRefreshFlag(prev=>!prev)
        toast.success('Job Deleted Successfully')

      }else{
        toast.error('Error in deleting job')
      }
    }catch(err){
        toast.error('Server Error')
    }
  }
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
            
              <button className='bg-blue-800 text-white px-5 py-2 rounded-2xl hover:scale-110 transition-transform'
              onClick={handleDelete}>
                Delete Job
              </button>
          
          </div>
        </div>
  )
}

export default AdminCards