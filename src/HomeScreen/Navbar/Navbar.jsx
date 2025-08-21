import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import logo from "../../assets/logo.png";
import { GoTriangleUp, GoTriangleDown } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { SearchedJobContext } from "../../ContextAPI/SearchedJobs/CreateContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [applied, setApplied] = useState(0);
  const [profileOpened, setProfileOpened] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(null);
  const [gender, setGender] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [userName, setUserName] = useState("");
  const [query, setQuery] = useState("");
  const [profileUdpated, setProfileUpdated] = useState(false);
  const { suggestion, setSuggestion } = useContext(SearchedJobContext);
  const [editProfileButton, setEditProfileButton] = useState(false);
  const { searchedJob, setSearchedJob } = useContext(SearchedJobContext);
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch Applied Jobs
  useEffect(() => {
    const Applied = async () => {
      try {
        const response = await fetch(
          "https://jobtracker-backend-ql5b.onrender.com/fetch/user-applied-applications",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        setApplied(data.jobsUserApplied.length);
      } catch (err) {
        console.log("An error occured", err);
      }
    };
    Applied();
  }, []);

  const handleSave = async () => {
    setEditProfileButton((prev) => !prev);
    const formData = {
      fullName,
      email,
      MobileNumber: mobileNumber,
      Gender: gender,
      JobTitle: jobTitle,
    };
    try {
      const response = await fetch(
        "https://jobtracker-backend-ql5b.onrender.com/edit-profile",
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setUserName(data.updatedUser.fullName);
        setJobTitle(data.updatedUser.jobTitle);
        setGender(data.updatedUser.gender?.toLowerCase());
        setMobileNumber(data.updatedUser.mobileNumber);
        setEmail(data.updatedUser.email);
        setProfileUpdated((prev) => !prev);
        toast.success("Profile Updated");
      } else {
        toast.error("Error Updating Profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getHeading = (path) => {
    if (path.startsWith("/jobs/") && path.endsWith("/apply")) return "Apply Job";
    switch (path) {
      case "/dashboard":
        return "Dashboard";
      case "/admin/dashboard":
        return "Admin Dashboard";
      case "/admin/post-job":
        return "Post Job";
      case "/inbox":
        return "Inbox";
      case "/jobs":
        return "Jobs";
      case "/jobs/filter-jobs":
        return "Filtered Jobs";
      default:
        return "Welcome";
    }
  };

  // Search jobs with debounce
  useEffect(() => {
    if (!query.trim()) {
      setSuggestion([]);
      return;
    }
    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://jobtracker-backend-ql5b.onrender.com/jobs/search-jobs?search=${query}`
        );
        const data = await response.json();
        setSuggestion(data);
        setSearchedJob(data);
      } catch (err) {
        console.log(err);
      }
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    setSuggestion([]);
    setQuery("");
  }, [location.pathname]);

  // Fetch personal info
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `https://jobtracker-backend-ql5b.onrender.com/personalinfo/${userId.id}`
        );
        const data = await response.json();
        setUserName(data.existingUser.fullName);
        setFullName(data.existingUser.fullName);
        setJobTitle(data.existingUser.jobTitle);
        setGender(data.existingUser.Gender?.toLowerCase());
        setMobileNumber(data.existingUser.MobileNumber);
        setEmail(data.existingUser.email);
        setJobTitle(data.existingUser.JobTitle);
        setEditProfile(!editProfile);
      } catch (err) {
        console.log("error");
      }
    };
    fetchPersonalInfo();
  }, [profileUdpated]);

  // Fetch user profile pic
  useEffect(() => {
    const fetchUserProfileUrl = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await fetch(
          `https://jobtracker-backend-ql5b.onrender.com/personalinfo/${user.id}`
        );
        const data = await response.json();
        setPreview(data.existingUser.userProfilePicUrl);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfileUrl();
  }, [preview]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserName(user.fullName);
    const profile_pic = localStorage.getItem("file_upload");
    setPreview(profile_pic);
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        "https://jobtracker-backend-ql5b.onrender.com/upload/user-profile-pic",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setPreview(data.secure_url);
        const response = await fetch(
          `https://jobtracker-backend-ql5b.onrender.com/save-profile-pic/${user.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userProfilePicUrl: data.secure_url }),
          }
        );

        if (response.ok) {
          toast.success("Image Uploaded successfully");
        } else {
          toast.error("Upload failed");
        }
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div className="bg-blue-100 w-full flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 rounded-xl shadow-md gap-3">
      {/* Logo */}
      <div className="flex items-center gap-2 md:gap-3">
        <img
          src={logo}
          alt="Logo"
          className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
        />
        <Link to="/">
          <h1 className="text-xl md:text-2xl font-black text-gray-800 hover:scale-105 transition-transform duration-200">
            <span className="text-amber-500">Track</span>Hire
          </h1>
        </Link>
      </div>

      {/* Route Heading */}
      <h2 className="text-lg md:text-xl font-semibold text-gray-700 text-center">
        {getHeading(location.pathname)}
      </h2>

      {/* Search Bar */}
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="flex items-center bg-white rounded-xl px-3 py-1 w-full shadow-sm">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full outline-none text-sm pl-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CiSearch className="text-gray-500" />
        </div>

        {query.trim() && (
          <ul className="absolute bg-white rounded shadow-md mt-1 max-h-60 overflow-auto w-full z-50">
            {suggestion.length > 0 ? (
              suggestion.map((value, index) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    const searchedValue = value.jobDetails.jobTitle;
                    setQuery(value.jobDetails.jobTitle);
                    setSuggestion([]);
                    navigate(`/jobs/searched-job/search/${searchedValue}`);
                  }}
                >
                  {value.jobDetails.jobTitle}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 italic">No jobs found</li>
            )}
          </ul>
        )}
      </div>

      {/* Profile Section */}
      <div className="flex items-center gap-3 relative">
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="rounded-full bg-gray-300 w-8 h-8 md:w-10 md:h-10 overflow-hidden">
            <img
              src={preview || null}
              alt="profile"
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm md:text-base font-bold">{userName}</span>
          {user.role === "user" && (
            <>
              {!profileOpened ? (
                <GoTriangleUp onClick={() => setProfileOpened((prev) => !prev)} />
              ) : (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
                  <div className="relative bg-gray-100 w-full max-w-3xl rounded-xl shadow-2xl flex flex-col md:flex-row overflow-y-auto max-h-[90vh]">
                    <IoMdClose
                      className="absolute top-3 right-3 text-gray-700 cursor-pointer bg-white rounded-full p-1"
                      size={28}
                      onClick={() => setProfileOpened((prev) => !prev)}
                    />

                    {/* Left: Profile pic */}
                    <div className="bg-amber-500 md:w-1/2 flex flex-col items-center py-6 px-4">
                      <div className="rounded-full bg-amber-50 w-40 h-40 md:w-60 md:h-60 overflow-hidden">
                        {preview && (
                          <img
                            src={preview || null}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="bg-blue-900 rounded-3xl p-2 text-white w-40 mt-3 text-xs md:text-sm"
                        onChange={handleImageUpload}
                      />
                      <h1 className="font-bold mt-3 text-lg">{userName}</h1>
                      <p className="text-sm">{jobTitle}</p>
                      <div className="flex flex-col mt-4 w-full px-4">
                        <span className="flex justify-between p-2 bg-amber-50 rounded-lg mt-1 mb-1 text-sm">
                          <h1>Applied</h1>
                          <h1>{applied}</h1>
                        </span>
                        <span className="flex justify-between p-2 bg-amber-50 rounded-lg mt-1 mb-1 text-sm">
                          <h1>Interviews</h1>
                          <h1>0</h1>
                        </span>
                        <span className="flex justify-between p-2 bg-amber-50 rounded-lg mt-1 mb-1 text-sm">
                          <h1>Offers</h1>
                          <h1>0</h1>
                        </span>
                      </div>
                    </div>

                    {/* Right: Info form */}
                    <div className="flex-1 p-6">
                      <h1 className="font-bold text-lg mb-4">
                        Personal Information
                      </h1>
                      {!editProfile ? (
                        <form className="space-y-3">
                          <div className="flex justify-between p-2 bg-amber-50 rounded-lg">
                            <label htmlFor="fullname">Name</label>
                            <input
                              type="text"
                              id="fullname"
                              className="outline-none bg-transparent text-right"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between p-2 bg-amber-50 rounded-lg">
                            <label htmlFor="email">Email</label>
                            <input
                              type="text"
                              id="email"
                              className="outline-none bg-transparent text-right"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between p-2 bg-amber-50 rounded-lg">
                            <label htmlFor="mob">Mobile</label>
                            <input
                              type="text"
                              id="mob"
                              className="outline-none bg-transparent text-right"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                            />
                          </div>
                          <div className="flex justify-between p-2 bg-amber-50 rounded-lg">
                            <label htmlFor="gender">Gender</label>
                            <select
                              id="gender"
                              className="outline-none bg-transparent text-right"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option value="">Choose gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="flex justify-between p-2 bg-amber-50 rounded-lg">
                            <label htmlFor="jt">Job Title</label>
                            <input
                              type="text"
                              id="jt"
                              className="outline-none bg-transparent text-right"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                            />
                          </div>
                        </form>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex justify-between p-2 bg-gray-300 rounded-lg">
                            <label>Name</label>
                            <input
                              type="text"
                              disabled
                              value={fullName}
                              className="outline-none bg-transparent text-right cursor-not-allowed"
                            />
                          </div>
                          <div className="flex justify-between p-2 bg-gray-300 rounded-lg">
                            <label>Email</label>
                            <input
                              type="text"
                              disabled
                              value={email}
                              className="outline-none bg-transparent text-right cursor-not-allowed"
                            />
                          </div>
                          <div className="flex justify-between p-2 bg-gray-300 rounded-lg">
                            <label>Mobile</label>
                            <input
                              type="text"
                              disabled
                              value={mobileNumber}
                              className="outline-none bg-transparent text-right cursor-not-allowed"
                            />
                          </div>
                          <div className="flex justify-between p-2 bg-gray-300 rounded-lg">
                            <label>Gender</label>
                            <select
                              value={gender}
                              disabled
                              className="outline-none bg-transparent text-right cursor-not-allowed"
                            >
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                          <div className="flex justify-between p-2 bg-gray-300 rounded-lg">
                            <label>Job Title</label>
                            <input
                              type="text"
                              disabled
                              value={jobTitle}
                              className="outline-none bg-transparent text-right cursor-not-allowed"
                            />
                          </div>
                        </div>
                      )}

                      {!editProfileButton ? (
                        <button
                          className="p-2 rounded-lg w-full bg-blue-950 mt-5 text-white cursor-pointer"
                          onClick={() => {
                            setEditProfileButton((prev) => !prev);
                            setEditProfile((prev) => !prev);
                          }}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          className="p-2 rounded-lg w-full bg-blue-950 mt-5 text-white cursor-pointer"
                          type="button"
                          onClick={handleSave}
                        >
                          Save
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
