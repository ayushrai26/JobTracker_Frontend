import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { CircleCheckBig } from 'lucide-react';
import { toast } from 'react-toastify';

function Cards({ job }) {
  const [appliedButton, setAppliedButton] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(null);

  if (!job || !job._id) return null;

  const jobTitle = job?.jobDetails?.jobTitle || job.jobTitle;
  const companyName = job?.jobDetails?.companyName || job.companyName;
  const eType = job?.Compensation?.etype || job.etype;
  const state = job?.jobDetails?.state || job.state;
  const city = job?.jobDetails?.city || job.city;
  const salary = job?.Compensation?.salary || job.salary;
  const shifttype = job?.Compensation?.shifttype || job.shifttype;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const isJobApplied = async () => {
      try {
        const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/isAppliedJob', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jobId: job._id, userId: user.id })
        });
        const data = await response.json();
        if (!data.jobExist) setAppliedButton(false);
        else setAppliedButton(true);
      } catch (err) {
        console.log('err', err);
      }
    };
    isJobApplied();
  }, []);

  const deleteBookmark = async () => {
    try {
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/delete/bookmarked/job', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ jobId: job._id })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Delete failed');
      toast.success('Bookmark deleted successfully');
      setIsBookmarked(false);
    } catch (err) {
      toast.error('❌ Error updating bookmark');
      console.error(err);
    }
  };

  const saveBookmark = async () => {
    try {
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/bookmark-jobs', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
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
      if (data.message === 'Job is Already bookmarked ') {
        toast.info('Already Bookmarked');
      } else if (data.message === 'Job saved successfully') {
        toast.success('Bookmark saved successfully');
        setIsBookmarked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchBookmarked = async () => {
      try {
        const response = await fetch("https://jobtracker-backend-ql5b.onrender.com/fetch-bookmark-jobs", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ jobId: job._id })
        });
        if (!response.ok) throw new Error("Failed to fetch bookmarks");

        const data = await response.json();
        if (Object.keys(data).length === 0) setIsBookmarked(false);
        else setIsBookmarked(true);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarked();
  }, []);

  return (
    <div className="flex flex-col bg-blue-300 shadow-lg rounded-2xl p-5 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] transition-all hover:shadow-xl hover:-translate-y-1 duration-300 m-3">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl p-3 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold text-lg shadow-md">
            {companyName?.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <h1 className="font-semibold text-lg text-gray-800">
              {jobTitle || "Untitled Job"}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {companyName || "Company"}
            </p>
          </div>
        </div>

        {/* Bookmark */}
        <div className="cursor-pointer bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition">
          {isBookmarked ? (
            <FaBookmark className="text-blue-600" onClick={deleteBookmark} />
          ) : (
            <FaRegBookmark className="text-blue-600" onClick={saveBookmark} />
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-blue-50 text-blue-600 px-3 py-1 text-xs font-medium rounded-full">
          {eType || "N/A"}
        </span>
        <span className="bg-green-50 text-green-600 px-3 py-1 text-xs font-medium rounded-full">
          {shifttype || "N/A"}
        </span>
        <span className="bg-purple-50 text-purple-600 px-3 py-1 text-xs font-medium rounded-full">
          {`${state || ""}, ${city || ""}`}
        </span>
      </div>

      <hr className="mt-4 border-gray-200" />

      {/* Footer */}
      <div className="flex justify-between mt-4 items-center">
        <p className="flex items-center gap-1 text-gray-700 font-medium text-sm">
          <AiTwotoneDollarCircle className="text-xl text-green-600" />
          {salary || "0"} <span className="text-gray-500">/ Month</span>
        </p>

        {appliedButton ? (
          <button
            className="bg-green-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 cursor-not-allowed shadow-md"
            disabled
          >
            Applied <CircleCheckBig />
          </button>
        ) : (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
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
