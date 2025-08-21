import React, { useEffect, useState } from 'react';
import Cards from './Cards';
import savedImage from '../../assets/No request found.mp4';
import Filter from '../Jobs/Filter';
import AdminCards from './AdminCards';

function Jobs({ countValue }) {
  const [allJob, setAllJob] = useState([]);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role || '';
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-all-jobs', {
          method: 'GET',
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
    <div className="flex flex-col md:flex-row w-full shadow-2xl min-h-screen">
      {/* Sidebar Filter */}
      <div className="md:sticky md:top-0 md:h-screen w-full md:w-1/4 lg:w-1/5 bg-white border-r">
        <Filter />
      </div>

      {/* Job Cards Section */}
      <div className="flex-1 w-full p-4">
        {Array.isArray(allJob) && allJob.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allJob.map((job) =>
              role === 'user' ? (
                <Cards
                  key={job._id}
                  value={countValue}
                  job={{
                    _id: job._id,
                    companyName: job.jobDetails?.companyName,
                    jobTitle: job.jobDetails?.jobTitle,
                    etype: job.Compensation?.etype,
                    shifttype: job.Compensation?.shifttype,
                    state: job.jobDetails?.state,
                    city: job.jobDetails?.city,
                    salary: job.Compensation?.salary,
                  }}
                />
              ) : (
                <AdminCards
                  key={job._id}
                  value={countValue}
                  job={{
                    _id: job._id,
                    companyName: job.jobDetails?.companyName,
                    jobTitle: job.jobDetails?.jobTitle,
                    etype: job.Compensation?.etype,
                    shifttype: job.Compensation?.shifttype,
                    state: job.jobDetails?.state,
                    city: job.jobDetails?.city,
                    salary: job.Compensation?.salary,
                  }}
                  setAllJob={setAllJob}
                  setRefreshFlag={setRefreshFlag}
                />
              )
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[70vh] text-center">
            <video autoPlay loop muted className="w-64 sm:w-80 md:w-[500px]">
              <source src={savedImage} type="video/mp4" />
            </video>
            <h1 className="font-bold text-xl md:text-2xl mt-4">No Jobs Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Jobs;
