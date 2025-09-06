import React, { useContext, useEffect } from 'react'
import { UserCheck } from 'lucide-react';
import { useState } from 'react';
import { IoDocumentOutline } from "react-icons/io5";
import { FaTag } from "react-icons/fa";
import { LaptopMinimalCheck } from 'lucide-react';
import { SatelliteDish } from 'lucide-react';
import { MdOutlineUpcoming } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router';
import AdminChart from './AdminChart'
import { CalendarCheck2 } from 'lucide-react';
import { X } from 'lucide-react';
import { MiscFunctionality } from '../../ContextAPI/Misc/createContext';
import { ClipboardClock } from 'lucide-react';

function AdminDashboard() {
  const [jobs, setJobs] = useState(0)
  const [applied, setApplied] = useState(0)
  const [appliedApplication, setAppliedApplication] = useState([])
  const [isActive, setIsActive] = useState('')
  const { applicationStatus, setApplicationStatus, shortlistedCandidate,
    setShortlistedCandidate, interviewScheduledCandidates, setInterviewScheduledCandidates,
    selectedCandidates, setSelectedCandidates, interviewedCandidates, setInterviewedCandidates,
    rejectedCandidates, setRejectedCandidates, underReviewCandidates, setUnderReviewCandidates } = useContext(MiscFunctionality)
  const navigate = useNavigate()
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch-all-jobs')
        const data = await response.json()
        setJobs(Array.isArray(data.jobs) ? data.jobs.length : 0)
      } catch (err) {
        console.log(err)
      }
    }

    const allAppliedJobs = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/fetch/all-applied-applications')
        const data = await response.json();
        setAppliedApplication(Array.isArray(data.allApplication) ? data.allApplication : [])
        setApplied(Array.isArray(data.allApplication) ? data.allApplication.length : 0);
      } catch (err) {
        console.log(err)
      }
    }

    fetchAllJobs();
    allAppliedJobs()
  }, [])

  const fetchApplicationStatus = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-application-status')
    const data = await response.json();
    const statusMap = data.reduce((acc, { jobId, status }) => {
      acc[jobId] = status;
      return acc;
    }, {});
    setApplicationStatus(statusMap);
  }

  const fetchForShortlistedCandidate = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-shortlisted-candidate')
    const data = await response.json()
    setShortlistedCandidate(data.shortlistedCandidate)
  }

  const fetchInterviewScheduledCandidates = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-interview-scheduled-candidates')
    const data = await response.json()
    setInterviewScheduledCandidates(data.InterviewScheduledCandidates)
  }

  const fetchInterviewedCandidates = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-interviewed-candidates')
    const data = await response.json()
    setInterviewedCandidates(data.InterviewedCandidates)
  }

  const fetchSelectedCandidates = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-selected-candidates')
    const data = await response.json()
    setSelectedCandidates(data.SelectedCandidates)
  }

  const fetchRejectedCandidates = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-rejected-candidates')
    const data = await response.json()
    setRejectedCandidates(data.RejectedCandidates)
  }

  const fetchUnderReviewCandidates = async () => {
    const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/admin/fetch-under-review-candidates')
    const data = await response.json()
    setUnderReviewCandidates(data.UnderReviewCandidates)
  }

  useEffect(() => {
    if (lastUpdated) {
      const saveApplicationStatus = async () => {
        const { jobId, status, userId } = lastUpdated
        try {
          await fetch(`https://jobtracker-backend-ql5b.onrender.com/admin/save-application-status/${jobId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status, userId })
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
  }, [lastUpdated])

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

  const handleJobPosted = () => {
    navigate('/jobs')
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
    
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ml-16">
        <div className="bg-blue-600 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition"
          onClick={handleJobPosted}>
          <IoDocumentOutline className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Jobs Posted</span>
          <span className="text-white text-lg">{jobs}</span>
        </div>

        <div className="bg-yellow-500 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Application Received')}>
          <SatelliteDish className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Applications Received</span>
          <span className="text-white text-lg">{applied}</span>
        </div>

        <div className="bg-orange-500 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Shortlisted Candidate')}>
          <FaCheckCircle className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Shortlisted</span>
          <span className="text-white text-lg">{shortlistedCandidate.length}</span>
        </div>

        <div className="bg-green-500 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Interview Scheduled')}>
          <CalendarCheck2 className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Interviews</span>
          <span className="text-white text-lg">{interviewScheduledCandidates.length}</span>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 ml-16">
        <div className="bg-amber-600 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Interviewed')}>
          <LaptopMinimalCheck className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Interviewed</span>
          <span className="text-white text-lg">{interviewedCandidates.length}</span>
        </div>

        <div className="bg-green-800 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Selected')}>
          <UserCheck className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Selected</span>
          <span className="text-white text-lg">{selectedCandidates.length}</span>
        </div>

        <div className="bg-red-600 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Rejected')}>
          <X className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Rejected</span>
          <span className="text-white text-lg">{rejectedCandidates.length}</span>
        </div>

        <div className="bg-amber-300 h-32 flex flex-col justify-center items-center rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
          onClick={() => setIsActive('Under Review')}>
          <ClipboardClock className="text-white text-3xl mb-1" />
          <span className="text-white font-bold">Under Review</span>
          <span className="text-white text-lg">{underReviewCandidates.length}</span>
        </div>
      </div>

      
      <div className="mt-8">
        {isActive === '' && <AdminChart />}

        {/* Tables Wrapper */}
        <div className="overflow-x-auto mt-6 sm:ml-16">
          {isActive === 'Application Received' && (
            <Table title="Applications" data={appliedApplication} applicationStatus={applicationStatus} setApplicationStatus={setApplicationStatus} setLastUpdated={setLastUpdated} />
          )}

          {isActive === 'Shortlisted Candidate' && (
            <CandidateTable title="Shortlisted Candidates" data={shortlistedCandidate} keyName="shortlistedCandidate" emptyMsg="No shortlisted candidates" />
          )}

          {isActive === 'Interview Scheduled' && (
            <CandidateTable title="Scheduled Interviews" data={interviewScheduledCandidates} keyName="InterviewScheduledCandidates" emptyMsg="No scheduled interviews" />
          )}

          {isActive === 'Interviewed' && (
            <CandidateTable title="Interviewed Candidates" data={interviewedCandidates} keyName="InterviewedCandidates" emptyMsg="No interviewed candidates" />
          )}

          {isActive === 'Selected' && (
            <CandidateTable title="Selected Candidates" data={selectedCandidates} keyName="SelectedCandidates" emptyMsg="No selected candidates" />
          )}

          {isActive === 'Rejected' && (
            <CandidateTable title="Rejected Candidates" data={rejectedCandidates} keyName="RejectedCandidates" emptyMsg="No rejected candidates" />
          )}

          {isActive === 'Under Review' && (
            <CandidateTable title="Under Review Candidates" data={underReviewCandidates} keyName="UnderReviewCandidates" emptyMsg="No candidates under review" />
          )}
        </div>
      </div>
    </div>
  )
}


const Table = ({ title, data, applicationStatus, setApplicationStatus, setLastUpdated }) => (
  <>
    <h1 className="text-2xl font-semibold text-center">{title}</h1>
    <table className="min-w-full border mt-4 bg-white rounded-lg shadow">
      <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
        <tr>
          <th className="px-6 py-3 border-b">Name</th>
          <th className="px-6 py-3 border-b">Position</th>
          <th className="px-6 py-3 border-b">Company</th>
          <th className="px-6 py-3 border-b">Resume</th>
          <th className="px-6 py-3 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? data.map((application, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="px-6 py-3 border-b">{application.name}</td>
            <td className="px-6 py-3 border-b">{application.skill}</td>
            <td className="px-6 py-3 border-b">{application.company}</td>
            <td className="px-6 py-3 border-b">
              {application.resume ? (
                <a href={application.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Resume</a>
              ) : "No Resume"}
            </td>
            <td className="px-6 py-3 border-b">
              <select
                className="border rounded px-2 py-1"
                value={applicationStatus[application._id] || ''}
                onChange={(e) => {
                  const newStatus = e.target.value
                  setApplicationStatus(prev => ({ ...prev, [application._id]: newStatus }))
                  setLastUpdated({ jobId: application._id, status: newStatus, userId: application.userId });
                }}>
                <option value="" disabled>Select</option>
                <option value="Application Received">Application Received</option>
                <option value="under review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="Interview scheduled">Interview Scheduled</option>
                <option value="interviewed">Interviewed</option>
                <option value="selected">Selected</option>
                <option value="reject">Rejected</option>
              </select>
            </td>
          </tr>
        )) : <tr><td colSpan="5" className="text-center py-4">No applications found</td></tr>}
      </tbody>
    </table>
  </>
)

const CandidateTable = ({ title, data, keyName, emptyMsg }) => (
  <>
    <h1 className="text-2xl font-semibold text-center">{title}</h1>
    <table className="min-w-full border mt-4 bg-white rounded-lg shadow">
      <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
        <tr>
          <th className="px-6 py-3 border-b">Name</th>
          <th className="px-6 py-3 border-b">Position</th>
          <th className="px-6 py-3 border-b">Company</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? data.map((group, i) => (
          group[keyName].map((candidate, j) => (
            <tr key={`${i}-${j}`} className="hover:bg-gray-50">
              <td className="px-6 py-3 border-b">{candidate.name}</td>
              <td className="px-6 py-3 border-b">{candidate.skill}</td>
              <td className="px-6 py-3 border-b">{candidate.company}</td>
            </tr>
          ))
        )) : <tr><td colSpan="3" className="text-center py-4">{emptyMsg}</td></tr>}
      </tbody>
    </table>
  </>
)

export default AdminDashboard
