import React, { useState } from 'react'
import Sidebar from './Sidebar/Sidebar'
import Navbar from './Navbar/Navbar'
import { Routes, Route, useLocation, Navigate } from 'react-router'
import UserDashboard from '../MainContent/Dashboard/UserDashboard'
import PostJob from '../MainContent/AddNew/PostJob'
import Inbox from '../MainContent/Inbox/Inbox'
import Jobs from '../MainContent/Jobs/Jobs'
import LandingPage from '../MainContent/LandingPage/LandingPage'
import Login from '../MainContent/Login/Login'
import Signup from '../MainContent/Signup/Signup'
import Apply from '../MainContent/Apply/Apply'
import ProtectedRoutes from '../ProtectedRoutes/ProtectedRoutes'
import ForgotPassword from '../MainContent/Login/ForgotPassword'
import JobLayout from '../MainContent/Jobs/JobLayout'
import FilterJobs from '../MainContent/Jobs/FilterJobs'
import SearchedJobs from '../MainContent/Jobs/SearchedJobs'
import AdminDashboard from '../MainContent/Dashboard/AdminDashboard'

function HomeScreen() {
  const [job, setJob] = useState([])
  const handleAddJob = (jobData) => {
    setJob((prevJob) => [...prevJob, jobData])
  }

  const [count, setCount] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const location = useLocation()
  const isLandingPage = location.pathname === '/'
  const isLoginPage = location.pathname === '/login'
  const isSignupPage = location.pathname === '/signup'
  const isForgotPassword = location.pathname === '/forgot-password'

  const storedUser = localStorage.getItem('user')
  const role =
    storedUser && storedUser !== 'undefined'
      ? JSON.parse(storedUser)
      : null

  return (
    <>
      {isLandingPage || isLoginPage || isSignupPage || isForgotPassword ? (
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      ) : (
        <div className="flex h-screen overflow-hidden">
      
          <div className="hidden md:flex">
            <Sidebar />
          </div>

      
          <div
            className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-64 bg-white h-full shadow-lg">
              <Sidebar />
            </div>
          </div>

          
          <div className="flex flex-col flex-grow">
        
            <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

            <div className="flex-grow overflow-y-auto">
              <Routes>
                <Route
                  path="/dashboard"
                  element={
                    role.role === 'user' ? (
                      <ProtectedRoutes>
                        <UserDashboard jobs={job} saved={count} />
                      </ProtectedRoutes>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/admin/dashboard"
               element={
                role.role === 'admin' ? (
                <ProtectedRoutes>
                <AdminDashboard />
             </ProtectedRoutes>
              ) : (
               <Navigate to="/login" />
              )
               }
              />
                <Route
                  path="/admin/post-job"
                  element={
                    role.role === 'admin' ? (
                      <ProtectedRoutes>
                        <PostJob setValue={handleAddJob} />
                      </ProtectedRoutes>
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
                <Route
                  path="/inbox"
                  element={
                    <ProtectedRoutes>
                      <Inbox jobs={job} />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoutes>
                      <JobLayout />
                    </ProtectedRoutes>
                  }
                >
                  <Route
                    index
                    element={
                      <ProtectedRoutes>
                        <Jobs jobs={job} countValue={setCount} />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path=":jobId/apply"
                    element={
                      <ProtectedRoutes>
                        <Apply />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="filter-jobs"
                    element={
                      <ProtectedRoutes>
                        <FilterJobs />
                      </ProtectedRoutes>
                    }
                  />
                  <Route
                    path="searched-job/search/:query"
                    element={
                      <ProtectedRoutes>
                        <SearchedJobs />
                      </ProtectedRoutes>
                    }
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomeScreen
