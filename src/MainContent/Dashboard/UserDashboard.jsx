import React, { useState,useEffect, useContext } from 'react'
import av from '../../assets/Looking for jobs.json'
import Lottie from 'lottie-react'
import select from '../../assets/Done _ Correct _ Tick.json'
import interviewLogo from '../../assets/Interview.json'
import appliedapp from '../../assets/application completed.json'
import rejectLogo from '../../assets/Rejected.json'
import Chart from './Chart';
import loading from '../../assets/Loading.json'
import list from '../../assets/List.json'
import bookmark from '../../assets/Bookmark animation.json'
import { ChartContext } from '../../ContextAPI/Chart/createContext'
import { useNavigate } from 'react-router'
import emptybox from '../../assets/Empty Box.json'
import Cards from '../Jobs/Cards'
function UserDashboard() {
  const [jobs,setJobs] = useState(0);
  const [saved,setSaved] = useState(0);
  const [bookmarked,setBookmarked] = useState([])
  const [applied,setApplied] = useState(0);
  const [appliedJobs,setAppliedJobs] = useState([])
  const [interviewScheduled,setInterviewScheduled] = useState(0);
  const [interviewScheduledJobs,setInterviewScheduledJobs] = useState([]);
  const [rejectedJobs,setRejectedJobs] = useState([]);
  const [rejected,setRejected] = useState(0);
  const [selected,setSelected] = useState(0);
  const [selectedJobs,setSelectedJobs] = useState([]);
  const [underReview,setUnderReview] = useState(0);
  const [underReviewJobs,setUnderReviewJobs] = useState([]);
  const [shortlisted,setShortlisted] = useState(0);
  const [shortlistedJobs,setShortlistedJobs] = useState([])
  const {isActive,setIsActive} = useContext(ChartContext)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const userId = user.id;

  useEffect(()=>{
    const jobsLength =async()=>{
    try{
      const response = await fetch('http://localhost:3000/fetch-all-jobs')
      const data = await response.json()
      setJobs(Array.isArray(data.jobs)?data.jobs.length:0)
      if(!Array.isArray(data)){
        console.log('No Jobs to display')
      }
    }catch(err){
       console.log('An error occured')
    }
  }
  const savedLength = async()=>{
    try{
      const response = await fetch('http://localhost:3000/fetch-bookmark-jobs/length',{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json()
      setBookmarked(data.bookmarkedLength)
      setSaved(Array.isArray(data.bookmarkedLength)?data.bookmarkedLength.length:0)
    }catch(err){
      console.log('An error occured')
  }
  }
  const Applied = async()=>{
    try{
      const response = await fetch('http://localhost:3000/fetch/user-applied-applications',{
        headers:{
          'Authorization':`Bearer ${localStorage.getItem('token')}`
        }
      })
      const data = await response.json();
      console.log(data,'yesss')
      setAppliedJobs(data.jobsUserApplied)
      setApplied(Array.isArray(data.jobsUserApplied)?data.jobsUserApplied.length:0);
    }catch(err){
      console.log('An error occured')
    }
  }

  const InterviewScheduled = async()=>{
    try{
                   const response  = await fetch('http://localhost:3000/fetch/interview-scheduled',{
                    headers:{
                      'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                   })
                   const data = await response.json();
                   setInterviewScheduled(data.length)
                   setInterviewScheduledJobs(data)
                   console.log(data,'data')

    }catch(err){
           console.log(err)
    }
  }

  const rejected = async()=>{
    try{
                   const response  = await fetch('http://localhost:3000/fetch/rejected',{
                    headers:{
                      'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                   })
                   const data = await response.json();
                   setRejected(data.length)
                   setRejectedJobs(data)
                   console.log(data,'data')

    }catch(err){
           console.log(err)
    }
  }

  const selected = async()=>{
    try{
                   const response  = await fetch('http://localhost:3000/fetch/selected',{
                    headers:{
                      'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                   })
                   const data = await response.json();
                   setSelected(data.length)
                   setSelectedJobs(data)
                   console.log(data,'data')

    }catch(err){
           console.log(err)
    }
  }

  const underReview = async()=>{
    try{
                   const response  = await fetch('http://localhost:3000/fetch/underReview',{
                    headers:{
                      'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                   })
                   const data = await response.json();
                   setUnderReview(data.length)
                   setUnderReviewJobs(data)
                   console.log(data,'data')

    }catch(err){
           console.log(err)
    }
  }

  const shortlisted = async()=>{
    try{
                   const response  = await fetch('http://localhost:3000/fetch/shortlisted',{
                    headers:{
                      'Authorization':`Bearer ${localStorage.getItem('token')}`
                    }
                   })
                   const data = await response.json();
                   setShortlisted(data.length)
                   setShortlistedJobs(data)
                   console.log(data,'data')

    }catch(err){
           console.log(err)
    }
  }

  InterviewScheduled()
   jobsLength()
   savedLength()
   Applied()
   shortlisted()
   underReview()
   selected()
   rejected()
},[])

  console.log(appliedJobs,'ap')

  return (
    <div className='flex flex-col mt-4'>
      <div className='flex flex-col'>
        <div className='flex w-full h-full overflow-y-auto px-4 md:px-30'>
      
      <div className='bg-blue-700 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-blue-500 hover:scale-110 cursor-pointer shadow-md' onClick={()=>{setIsActive('availableApplications')
        navigate('/jobs')
      }}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Available Jobs</h1>
      <span className='text-white font-bold'>{jobs}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={av} style={{width:100,z:0}}/>
     </div>

       
       
    
    </div>
    
      <div className='bg-yellow-500 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-yellow-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('bookmarkedJobs')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Bookmarked Jobs</h1>
      <span className='text-white font-bold'>{saved}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={bookmark} style={{width:50,z:0}}/>
     </div>

       
       
    
    </div>

     
      
      <div className='bg-orange-500 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-orange-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('appliedApplications')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Applied Jobs</h1>
      <span className='text-white font-bold'>{applied}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={appliedapp} style={{width:120,z:0}}/>
     </div>

       
       
    
    </div>
    <div className='bg-green-500 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('interviewScheduled')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Interview Scheduled</h1>
      <span className='text-white font-bold'>{interviewScheduled}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={interviewLogo} style={{width:110,z:0}}/>
     </div>


       
       
    
    </div>
      </div>
      <div className='flex w-full h-full overflow-y-auto px-4 md:px-30'>
        <div className='bg-red-500 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('rejected')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Rejected</h1>
      <span className='text-white font-bold'>{rejected}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={rejectLogo} style={{width:100,z:0}}/>
     </div>

       
       
    
    </div>
    <div className='bg-green-400 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('selected')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Selected</h1>
      <span className='text-white font-bold'>{selected}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={select} style={{width:100,z:0}}/>
     </div>

       
       
    
    </div>
    <div className='bg-amber-200 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('underReview')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Under Review</h1>
      <span className='text-white font-bold'>{underReview}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={loading} style={{width:100,z:0}}/>
     </div>

       
       
    
    </div>
    <div className='bg-gray-300 h-28 w-50 m-3 p-3 flex rounded-xl hover:bg-green-300 hover:scale-110 cursor-pointer shadow-md' onClick={()=>setIsActive('shortlisted')}>
     <div className='flex flex-col justify-evenly items-center'>
      <h1 className='text-white font-bold'>Shortlisted</h1>
      <span className='text-white font-bold'>{shortlisted}</span>
     </div>
     <div className='relative-z-0'>
      <Lottie animationData={list} style={{width:100,z:0}}/>
     </div>

       
       
    
    </div>
      </div>
    
    
    
      
    </div>
    
      {isActive === 'bookmarkedJobs' && (<>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">Bookmarked JObs</h1>
        <div className='ml-18 flex flex-wrap'>
       {Array.isArray(bookmarked) && bookmarked.length>0?(<>
       
       {bookmarked.map((job)=>(
        <Cards
         key={job._id}
              
              job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }}/>
       ))}
       </>):(<>
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>
       </>)}
        </div>
      </>)}
      {isActive === 'appliedApplications'&&(<>
       <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">Applied JObs</h1>
     <div className='ml-18 flex flex-wrap'>
      {Array.isArray(appliedJobs) && appliedJobs.length > 0 ?
      (<>
      {appliedJobs.map((jobs)=>(
      jobs.JobsUserApplied.map((job)=>(
        <Cards
        key={job._id}
        job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }}
        />
      ))
      
      ))}
      
      </>)
      :
      (<>
     <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>
      </>)}
     </div>
      
      </>)}
      {isActive === 'interviewScheduled' && (<>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">Interview Scheduled</h1>
      <div className='ml-18 flex flex-wrap'>
      {Array.isArray(interviewScheduledJobs) && interviewScheduledJobs.length>0?(<>
      {interviewScheduledJobs.map((jobs)=>(
        jobs.finalInterviewedScheduled.map((job)=>(
          <Cards
          key={job._id}
        job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }} />
        ))
      ))}
      
      </>):(<>
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'rejected' && (<>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">Rejected Jobs</h1>
      <div className='ml-18 flex flex-wrap'>
      {Array.isArray(rejectedJobs) && rejectedJobs.length>0?(<>
      {rejectedJobs.map((jobs)=>(
        jobs.finalRejected.map((job)=>(
          <Cards
          key={job._id}
        job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }} />
        ))
      ))}
      
      </>):(<>
     <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'selected' && (<>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">Selected</h1>
      <div className='ml-18 flex flex-wrap'>
      {Array.isArray(selectedJobs) && selectedJobs.length>0?(<>
      {selectedJobs.map((jobs)=>(
        jobs.finalSelected.map((job)=>(
          <Cards
          key={job._id}
        job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }} />
        ))
      ))}
      
      </>):(<>
     <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'underReview' && (<>
      <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">Under Review</h1>
      <div className='ml-18 flex flex-wrap'>
      {Array.isArray(underReviewJobs) && underReviewJobs.length>0?(<>
      {underReviewJobs.map((jobs)=>(
        jobs.finalUnderReview.map((job)=>(
          <Cards
          key={job._id}
        job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }} />
        ))
      ))}
      
      </>):(<>
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'shortlisted' && (<>
     <h1 className="text-3xl font-bold text-gray-800 mt-6 mb-6 text-center border-b-2 border-gray-200 pb-2 tracking-wide">
  Shortlisted
</h1>


      <div className='ml-18 flex flex-wrap'>
      {Array.isArray(shortlistedJobs) && shortlistedJobs.length>0?(<>
      {shortlistedJobs.map((jobs)=>(
        jobs.finalShortlisted.map((job)=>(
          <Cards
          key={job._id}
        job={{
                _id:job._id,
                companyName: job.jobDetails?.companyName,
                jobTitle: job.jobDetails?.jobTitle,
                etype: job.Compensation?.etype,
                shifttype: job.Compensation?.shifttype,
                state: job.jobDetails?.state,
                city: job.jobDetails?.city,
                salary: job.Compensation?.salary
              }} />
        ))
      ))}
      
      </>):(<>
      <div className="flex flex-col items-center justify-center w-full min-h-[60vh] space-y-4">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-lg font-semibold text-gray-600">No jobs available</p>
</div>


      
      </>)}
      </div>
      </>)}
     

    <div className='w-full'>
      
      <Chart/>
      
      
    </div>
    </div>
    
  )
}

export default UserDashboard