import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signup1 from '../../assets/2941990.jpg';
import { FaRegEyeSlash } from "react-icons/fa";
import { MdOutlineRemoveRedEye, MdOutlineAlternateEmail, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import logo from '../../assets/logo.png';
import signup2 from '../../assets/5292747.jpg';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [fullName, setFullName] = useState('');
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('Signup successful!');
        navigate('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen items-center justify-center">
      {/* Left Section */}
      <div className="bg-blue-700 w-full lg:w-1/2 h-full flex flex-col gap-5 justify-center items-center p-6">
        <div className="flex items-center gap-5">
          <img src={logo} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" alt="logo" />
          <div className="h-10 w-0.5 bg-white"></div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">TrackHire</h1>
        </div>

        <hr className="w-3/4 border-t-2 border-white my-2" />
        <h1 className="text-lg sm:text-2xl font-bold text-white text-center">
          Create Your Account for Free!
        </h1>

        <div className="flex gap-3 sm:gap-5 flex-wrap justify-center">
          <img src={signup1} className="w-32 sm:w-40 lg:w-48 rounded-md" alt="signup1" />
          <img src={signup2} className="w-32 sm:w-40 lg:w-48 rounded-md" alt="signup2" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center bg-amber-100 w-full sm:w-3/4 lg:w-2/3 p-6 sm:p-10 rounded-2xl shadow-md"
        >
          <h1 className="text-xl sm:text-2xl font-bold">Sign Up</h1>

          {/* Full Name */}
          <span className="relative bg-gray-100 rounded-2xl w-full sm:w-3/4 p-3 mt-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none bg-transparent"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
            />
            <MdOutlineDriveFileRenameOutline className="absolute right-6 top-4" />
          </span>

          {/* Email */}
          <span className="relative bg-gray-100 rounded-2xl w-full sm:w-3/4 p-3 mt-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <MdOutlineAlternateEmail className="absolute right-6 top-4" />
          </span>

          {/* Password */}
          {showPassword ? (
            <span className="relative bg-gray-100 rounded-2xl w-full sm:w-3/4 p-3 mt-5">
              <input
                type="password"
                placeholder="Password"
                className="w-full outline-none bg-transparent"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <FaRegEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-4 cursor-pointer"
              />
            </span>
          ) : (
            <span className="relative bg-gray-100 rounded-2xl w-full sm:w-3/4 p-3 mt-5">
              <input
                type="text"
                placeholder="Password"
                className="w-full outline-none bg-transparent"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <MdOutlineRemoveRedEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-4 cursor-pointer"
              />
            </span>
          )}

          {/* Signup Button */}
          <button
            className="bg-blue-800 text-white rounded-2xl py-2 px-6 mt-5 cursor-pointer hover:bg-blue-900 transition"
            type="submit"
          >
            {loading?(<>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>):(<>
            SIGN UP
            </>)}
          </button>
            {loading && <p className="mt-2 text-gray-500">Please wait...</p>}
          {/* Login Link */}
          <div className="p-3 flex flex-col items-center">
            <p className="text-sm">Already have an account?</p>
            <Link className="p-2" to="/login">
              <p className="text-sm text-blue-600 hover:underline">LOGIN</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
