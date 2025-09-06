import React from 'react'
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { toast } from 'react-toastify';

function AdminCards({ job, setAllJob, setRefreshFlag }) {
  if (!job || !job._id) return null;

  const jobTitle = job?.jobDetails?.jobTitle || job.jobTitle;
  const companyName = job?.jobDetails?.companyName || job.companyName;
  const eType = job?.Compensation?.etype || job.etype;
  const state = job?.jobDetails?.state || job.state;
  const city = job?.jobDetails?.city || job.city;
  const salary = job?.Compensation?.salary || job.salary;
  const shifttype = job?.Compensation?.shifttype || job.shifttype;

  const id = job._id;

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://jobtracker-backend-ql5b.onrender.com/admin/delete-job/${job._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAllJob((prev) => prev.filter((job) => job._id !== id));
        setRefreshFlag((prev) => !prev);
        toast.success('Job Deleted Successfully');
      } else {
        toast.error('Error in deleting job');
      }
    } catch (err) {
      toast.error('Server Error');
    }
  };

  return (
    <div className="flex flex-col bg-blue-300 shadow-lg rounded-2xl p-5 w-full sm:w-[320px] md:w-[360px] lg:w-[380px] transition-all hover:shadow-xl hover:-translate-y-1 duration-300 m-3">
      
    
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl p-3 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-lg shadow-md">
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
      </div>

      
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

      
      <div className="flex justify-between mt-4 items-center">
        <p className="flex items-center gap-1 text-gray-700 font-medium text-sm">
          <AiTwotoneDollarCircle className="text-xl text-green-600" />
          {salary || "0"} <span className="text-gray-500">/ Month</span>
        </p>

        <button
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-5 py-2 rounded-lg shadow-md transition-transform hover:scale-105"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default AdminCards;
