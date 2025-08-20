import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineDashboard, MdClose } from "react-icons/md";
import { TfiBag } from "react-icons/tfi";
import { SquarePlus } from 'lucide-react';
import { Bell } from 'lucide-react';
import { BiLogOutCircle } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaInbox } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LayoutDashboard } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { Briefcase } from 'lucide-react';
import { Menu } from 'lucide-react';
function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarValue = location.pathname;
  const [openSidebar, setOpenSidebar] = useState(false);
   const role = JSON.parse(localStorage.getItem('user'))
  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <aside className={`h-full z-10 fixed bg-gray-300 ${openSidebar ? 'w-64' : 'w-16'} transition-all duration-300`}>
      <div className='flex items-center justify-between p-6 h-16'>
        {openSidebar ? (
          <>
            <h1 className='font-bold text-lg'>Job Tracker</h1>
            <button onClick={() => setOpenSidebar(!openSidebar)}>
              <MdClose />
            </button>
          </>
        ) : (
          <button onClick={() => setOpenSidebar(!openSidebar)}><Menu /></button>
        )}
      </div>

      <div className='flex flex-col items-center gap-y-5 m-5'>
        {[
          ...(role.role==='admin'?[{ path: '/admin/dashboard', icon: <LayoutDashboard />, label: ' Admin Dashboard' }]:[{ path: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' }]),
          ...(role.role==='admin'?[{ path: '/admin/post-job',icon: <SquarePlus />, label: 'Post Job' }]:[]),
          
          { path: '/jobs', icon:  <Briefcase />, label: 'Jobs' },
          ...(role.role === 'user'?[{ path: '/inbox', icon:  <Bell />, label: 'Inbox' }]:[])
        ].map(({ path, icon, label }) => (
          
          <Link to={path} key={path} className='w-full'>
            <div className={`
              flex items-center w-full p-3 rounded-2xl transition-all duration-300 cursor-pointer
              ${sidebarValue === path 
                ? 'bg-blue-500 text-white font-semibold scale-[1.03]' 
                : 'hover:bg-gray-200 text-black'}
              ${openSidebar ? 'justify-start' : 'justify-center'}
            `}>
              <span className='text-xl'>{icon}</span>
              {openSidebar && <span className='pl-4 text-base'>{label}</span>}
            </div>
          </Link>
        ))}

        {/* Logout Button */}
        <div
          className={`flex items-center w-full p-3 rounded-2xl transition-all duration-300 cursor-pointer hover:bg-gray-200 text-black
            ${openSidebar ? 'justify-start' : 'justify-center'}`}
          onClick={logOut}
        >
          <span className='text-xl'> <LogOut /></span>
          {openSidebar && <span className='pl-4 text-base'>Logout</span>}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
