import React, { useState } from 'react'
import Lottie from 'lottie-react'
import forget from '../../assets/Animation - 1751277808652.json'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Loader } from 'lucide-react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false)
  const [accessToChangePassword, setAccessToChangePassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/forgetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setAccessToChangePassword(true);
        toast.success('User matched, you can now change your password');
      } else {
        toast.error('Error matching user');
      }
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false)
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await fetch('https://jobtracker-backend-ql5b.onrender.com/changePassword', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        toast.success('Password updated successfully');
        setAccessToChangePassword(false);
        setEmail('');
        setPassword('');
        navigate('/login');
      } else {
        toast.error('Error updating password');
      }
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-12">

      <div className="w-full md:w-1/2 flex items-center justify-center mb-10 md:mb-0">
        <div className="w-3/4 max-w-md">
          <Lottie loop autoplay animationData={forget} />
        </div>
      </div>

    
      <div className="w-full md:w-1/2 flex flex-col items-center">
        <div className="w-full max-w-md">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center md:text-left">
            Forget <br className="hidden md:block" /> Your Password?
          </h1>

          {accessToChangePassword ? (
            <form className="flex flex-col" onSubmit={handleFinalSubmit}>
              <label className="text-lg md:text-2xl mb-2">Enter New Password</label>
              <input
                type="password"
                placeholder="Enter New Password"
                className="p-3 outline-none bg-gray-200 rounded-2xl mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-blue-700 p-3 text-white rounded-2xl hover:bg-blue-800 transition"
                type="submit"
              >
                {loading ? (<>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                </>):(<>
                Reset Password
                </>)}
              </button>
            </form>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="p-3 outline-none bg-gray-200 rounded-2xl mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-blue-700 p-3 text-white rounded-2xl hover:bg-blue-800 transition"
                type="submit"
              >
                {loading?(<>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                </>):(<>Reset Password</>)}
                
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
