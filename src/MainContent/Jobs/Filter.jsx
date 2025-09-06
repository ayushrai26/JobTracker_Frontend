import React, { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { IoFilter } from "react-icons/io5";
import { PiToggleLeftLight } from "react-icons/pi";
import { MdToggleOn } from "react-icons/md";
import data from "../../assets/data.json";
import { toast } from "react-toastify";
import { filteredContext } from "../../ContextAPI/FilteredJobs/createContext.js";

function Filter() {
  const [roles, setRoles] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [salary, setSalary] = useState(0);
  const { setFilterd } = useContext(filteredContext);
  const navigate = useNavigate();

  const [skills, setSkills] = useState("");

  const States = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
    "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha",
    "Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
  ];

  const Skills = [
    "FullStack","Frontend","Backend","MobileDevelopment","QATesting","DevOpsCloudInfra",
    "Security","DataAI","ProductManagement","Others"
  ];

  const Roles = [
    { category: "FullStack", roles: ["Full Stack Developer","MERN Stack Developer","MEAN Stack Developer","Java Full Stack Developer","Python Full Stack Developer","PHP Full Stack Developer"] },
    { category: "Frontend", roles: ["Frontend Developer","React Developer","Angular Developer","Vue.js Developer","JavaScript Developer","UI Developer","Web Developer"] },
    { category: "Backend", roles: ["Backend Developer","Node.js Developer","Java Developer","Python Developer","PHP Developer","Ruby on Rails Developer",".NET Developer","Golang Developer"] },
    { category: "MobileDevelopment", roles: ["Mobile App Developer","React Native Developer","Flutter Developer","Android Developer","iOS Developer"] },
    { category: "QATesting", roles: ["QA Engineer","SDET","Automation Tester","Manual Tester","Performance Tester"] },
    { category: "DevOpsCloudInfra", roles: ["DevOps Engineer","Cloud Engineer","SRE","AWS Engineer","Azure Engineer","Kubernetes Engineer"] },
    { category: "Security", roles: ["Cybersecurity Analyst","Security Engineer","Penetration Tester"] },
    { category: "DataAI", roles: ["Data Scientist","Data Analyst","Data Engineer","ML Engineer","AI Engineer","BI Developer"] },
    { category: "ProductManagement", roles: ["Product Manager","Project Manager","Scrum Master","Technical Program Manager"] },
    { category: "Others", roles: ["Software Engineer","Software Developer","Tech Lead","Intern - Software Development","Junior Developer","Senior Software Engineer"] }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/jobs/filter-jobs");
    try {
      const response = await fetch("https://jobtracker-backend-ql5b.onrender.com/Jobs/filterJobs", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ roles, state, city, salary })
      });
      const data = await response.json();
      setFilterd(data);
      response.ok ? toast.success("Filtered jobs") : toast.error("Error filtering jobs");
    } catch (err) {
      toast.error(err.message || "Error fetching jobs");
    }
  };

  return (
    <div className="p-4 sm:p-5 md:ml-4 lg:ml-12 overflow-y-auto max-h-screen ">
      
      <div className="flex items-center justify-between bg-white shadow-md rounded-2xl px-4 py-3 mb-5 sticky top-0 z-10">
        <h1 className="font-bold text-base sm:text-lg flex items-center gap-2 text-gray-700">
          <IoFilter className="text-blue-600" /> Filter Jobs
        </h1>
        
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
      
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Skills</h2>
          <select
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm sm:text-base"
          >
            <option>Choose Skills</option>
            {Skills.map((skill, i) => (
              <option key={i}>{skill}</option>
            ))}
          </select>

          {skills && (
            <div className="mt-3">
              <label className="font-medium text-gray-600 text-sm sm:text-base">Roles</label>
              <select
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                className="w-full border rounded-lg p-2 mt-1 text-sm sm:text-base"
              >
                <option>Choose Roles</option>
                {Roles.find((s) => s.category === skills)?.roles.map((role, i) => (
                  <option key={i}>{role}</option>
                ))}
              </select>
            </div>
          )}
        </div>

      
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Location</h2>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border rounded-lg p-2 mb-2 text-sm sm:text-base"
          >
            <option value="">Choose State</option>
            {States.map((st) => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>

          {state && (
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm sm:text-base"
            >
              <option value="">Choose City</option>
              {data.states.find((s) => s.state === state)?.districts.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
          )}
        </div>

      
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Job Type</h2>
          <div className="flex flex-col gap-2">
            {["Full time", "Part time", "Internship"].map((type, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer text-sm sm:text-base">
                <input type="radio" name="jobType" value={type} className="accent-blue-600" />
                {type}
              </label>
            ))}
          </div>
        </div>

      
        <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md">
          <h2 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">Expected Salary</h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-1">₹ {salary} / month</p>
          <input
            type="range"
            min="0"
            max="100000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            step="5000"
            className="w-full accent-blue-600"
          />
        </div>

      
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 sm:py-3 rounded-2xl shadow-md hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}

export default Filter;
