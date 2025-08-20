import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import savedImage from '../../assets/No request found.mp4'

import Filter from '../Jobs/Filter'
import AdminCards from './AdminCards';
function Jobs({ countValue }) {
  
  const [allJob, setAllJob] = useState([]);
   
  const user = JSON.parse(localStorage.getItem('user') || '{}');
const role = user.role || '';
  const [refreshFlag,setRefreshFlag] = useState(false)
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        
        const response = await fetch('http://localhost:3000/fetch-all-jobs',{
          method:'GET'
        });
        
        const data = await response.json();
        setAllJob(data.jobs);
      } catch (err) {
        console.log('Error fetching jobs', err);
      }
    };
    fetchJobs();
  }, [refreshFlag]);
  
  return (
    
    <div className='flex w-full shadow-2xl  '>
      
      <div className="sticky top-0 max-h-[110vh]">
        <Filter />
      </div>
    <div>
      {Array.isArray(allJob) && allJob.length > 0 ? (
        <div className='flex flex-wrap ml-5'>
          {allJob.map((job) => (
            role === 'user'?(
              <Cards
              key={job._id}
              value={countValue}
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
            ):(
              <AdminCards 
              key={job._id}
              value={countValue}
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
              setAllJob={setAllJob}
              setRefreshFlag={setRefreshFlag}/>
            )
          ))}
        </div>
      ) : (
        <div className='flex flex-col items-center scroll-auto justify-center h-full ml-30'>
          <video autoPlay loop muted width="600" height="600">
  <source src={savedImage} type="video/mp4"/>
</video>

          <h1 className='font-bold text-2xl'>No Jobs Found</h1>
        </div>
      )}
    </div>
    
    </div>
  )   
}

export default Jobs;
