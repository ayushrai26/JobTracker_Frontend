import React, { useState, useEffect, useContext } from 'react'
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
  const [jobs, setJobs] = useState(0);
  const [saved, setSaved] = useState(0);
  const [bookmarked, setBookmarked] = useState([])
  const [applied, setApplied] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState([])
  const [interviewScheduled, setInterviewScheduled] = useState(0);
  const [interviewScheduledJobs, setInterviewScheduledJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [rejected, setRejected] = useState(0);
  const [selected, setSelected] = useState(0);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [underReview, setUnderReview] = useState(0);
  const [underReviewJobs, setUnderReviewJobs] = useState([]);
  const [shortlisted, setShortlisted] = useState(0);
  const [shortlistedJobs, setShortlistedJobs] = useState([])
  const { isActive, setIsActive } = useContext(ChartContext)
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  const userId = user.id;

  useEffect(() => {
    const jobsLength = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-all-jobs')
        const data = await response.json()
        setJobs(Array.isArray(data.jobs) ? data.jobs.length : 0)
        if (!Array.isArray(data)) {
          console.log('No Jobs to display')
        }
      } catch (err) {
        console.log('An error occured')
      }
    }
    const savedLength = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-bookmark-jobs/length', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json()
        setBookmarked(data.bookmarkedLength)
        setSaved(Array.isArray(data.bookmarkedLength) ? data.bookmarkedLength.length : 0)
      } catch (err) {
        console.log('An error occured')
      }
    }
    const Applied = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/user-applied-applications', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json();
        setAppliedJobs(data.jobsUserApplied)
        setApplied(Array.isArray(data.jobsUserApplied) ? data.jobsUserApplied.length : 0);
      } catch (err) {
        console.log('An error occured')
      }
    }

    const InterviewScheduled = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/interview-scheduled', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json();
        setInterviewScheduled(data.length)
        setInterviewScheduledJobs(data)
      } catch (err) {
        console.log(err)
      }
    }

    const rejected = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/rejected', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json();
        setRejected(data.length)
        setRejectedJobs(data)
      } catch (err) {
        console.log(err)
      }
    }

    const selected = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/selected', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json();
        setSelected(data.length)
        setSelectedJobs(data)
      } catch (err) {
        console.log(err)
      }
    }

    const underReview = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/underReview', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json();
        setUnderReview(data.length)
        setUnderReviewJobs(data)
      } catch (err) {
        console.log(err)
      }
    }

    const shortlisted = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/shortlisted', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        const data = await response.json();
        setShortlisted(data.length)
        setShortlistedJobs(data)
      } catch (err) {
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
  }, [])

  return (
    <div className="flex flex-col mt-6 px-4 sm:px-6 lg:px-12">
      {/* Top Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:ml-16">
        
        {/* Available Jobs */}
        <div
          className="flex items-center justify-between bg-blue-600 text-white rounded-2xl p-4 shadow-lg hover:bg-blue-500 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => { setIsActive('availableApplications'); navigate('/jobs') }}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Available Jobs</h1>
            <span className="text-2xl font-bold">{jobs}</span>
          </div>
          <Lottie animationData={av} style={{ width: 80 }} />
        </div>

        {/* Bookmarked Jobs */}
        <div
          className="flex items-center justify-between bg-yellow-500 text-white rounded-2xl p-4 shadow-lg hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('bookmarkedJobs')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Bookmarked</h1>
            <span className="text-2xl font-bold">{saved}</span>
          </div>
          <Lottie animationData={bookmark} style={{ width: 60 }} />
        </div>

        {/* Applied Jobs */}
        <div
          className="flex items-center justify-between bg-orange-500 text-white rounded-2xl p-4 shadow-lg hover:bg-orange-400 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('appliedApplications')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Applied</h1>
            <span className="text-2xl font-bold">{applied}</span>
          </div>
          <Lottie animationData={appliedapp} style={{ width: 90 }} />
        </div>

        {/* Interview Scheduled */}
        <div
          className="flex items-center justify-between bg-green-600 text-white rounded-2xl p-4 shadow-lg hover:bg-green-500 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('interviewScheduled')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Interviews</h1>
            <span className="text-2xl font-bold">{interviewScheduled}</span>
          </div>
          <Lottie animationData={interviewLogo} style={{ width: 90 }} />
        </div>
      </div>

      {/* Second Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 sm:ml-16">

        {/* Rejected */}
        <div
          className="flex items-center justify-between bg-red-500 text-white rounded-2xl p-4 shadow-lg hover:bg-red-400 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('rejected')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Rejected</h1>
            <span className="text-2xl font-bold">{rejected}</span>
          </div>
          <Lottie animationData={rejectLogo} style={{ width: 80 }} />
        </div>

        {/* Selected */}
        <div
          className="flex items-center justify-between bg-green-500 text-white rounded-2xl p-4 shadow-lg hover:bg-green-400 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('selected')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Selected</h1>
            <span className="text-2xl font-bold">{selected}</span>
          </div>
          <Lottie animationData={select} style={{ width: 80 }} />
        </div>

        {/* Under Review */}
        <div
          className="flex items-center justify-between bg-amber-400 text-white rounded-2xl p-4 shadow-lg hover:bg-amber-300 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('underReview')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Under Review</h1>
            <span className="text-2xl font-bold">{underReview}</span>
          </div>
          <Lottie animationData={loading} style={{ width: 80 }} />
        </div>

        {/* Shortlisted */}
        <div
          className="flex items-center justify-between bg-gray-400 text-white rounded-2xl p-4 shadow-lg hover:bg-gray-300 transition-transform duration-300 hover:scale-105 cursor-pointer"
          onClick={() => setIsActive('shortlisted')}
        >
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">Shortlisted</h1>
            <span className="text-2xl font-bold">{shortlisted}</span>
          </div>
          <Lottie animationData={list} style={{ width: 80 }} />
        </div>
      </div>

      {/* Conditional Render Sections */}
      <div className="mt-8">
        {isActive === 'bookmarkedJobs' && (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">Bookmarked Jobs</h1>
            <div className="flex flex-wrap justify-center gap-6">
              {Array.isArray(bookmarked) && bookmarked.length > 0 ? (
                bookmarked.map((job) => (
                  <Cards key={job._id}
                    job={{
                      _id: job._id,
                      companyName: job.jobDetails?.companyName,
                      jobTitle: job.jobDetails?.jobTitle,
                      etype: job.Compensation?.etype,
                      shifttype: job.Compensation?.shifttype,
                      state: job.jobDetails?.state,
                      city: job.jobDetails?.city,
                      salary: job.Compensation?.salary
                    }} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[50vh]">
                  <Lottie animationData={emptybox} style={{ width: 220 }} />
                  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
                </div>
              )}
            </div>
          </>
        )}

        
      {isActive === 'appliedApplications'&&(<>
       <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">Applied JObs</h1>
     <div className='flex flex-wrap justify-center gap-6'>
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
     <div className="flex flex-col items-center justify-center min-h-[50vh]">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
</div>
      </>)}
     </div>
      
      </>)}
      {isActive === 'interviewScheduled' && (<>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">Interview Scheduled</h1>
      <div className='flex flex-wrap justify-center gap-6'>
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
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'rejected' && (<>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">Rejected Jobs</h1>
      <div className='flex flex-wrap justify-center gap-6'>
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
     <div className="flex flex-col items-center justify-center min-h-[50vh]">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'selected' && (<>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">Selected</h1>
      <div className='flex flex-wrap justify-center gap-6'>
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
     <div className="flex flex-col items-center justify-center min-h-[50vh]">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'underReview' && (<>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">Under Review</h1>
      <div className='flex flex-wrap justify-center gap-6'>
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
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
</div>
      </>)}
      </div>
      </>)}

      {isActive === 'shortlisted' && (<>
     <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center border-b pb-3 mb-6">
  Shortlisted
</h1>


      <div className='flex flex-wrap justify-center gap-6'>
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
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
  <Lottie animationData={emptybox} style={{ width: 250 }} />
  <p className="text-gray-600 font-semibold mt-2">No jobs available</p>
</div>


      
      </>)}
      </div>
      </>)}

        
      </div>

      {/* Chart Section */}
      <div className="mt-10 w-full">
        <Chart />
      </div>
    </div>
  )
}

export default UserDashboard
