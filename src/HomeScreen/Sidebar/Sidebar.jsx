import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LayoutDashboard, SquarePlus, Briefcase, Bell, LogOut, Menu } from 'lucide-react';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarValue = location.pathname;
  const [openSidebar, setOpenSidebar] = useState(false);
  const role = JSON.parse(localStorage.getItem('user'));

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <aside
      className={`
        fixed h-full z-20 bg-gray-300 shadow-lg
        ${openSidebar ? 'w-64' : 'w-16'}
        transition-all duration-300
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-200">
        {openSidebar ? (
          <>
            <h1 className="font-bold text-lg whitespace-nowrap">Job Tracker</h1>
            <button
              onClick={() => setOpenSidebar(false)}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <MdClose size={20} />
            </button>
          </>
        ) : (
          <button
            onClick={() => setOpenSidebar(true)}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <Menu size={20} />
          </button>
        )}
      </div>

      {/* Sidebar Items */}
      <div className="flex flex-col gap-y-3 m-4">
        {[
          ...(role.role === 'admin'
            ? [{ path: '/admin/dashboard', icon: <LayoutDashboard />, label: 'Admin Dashboard' }]
            : [{ path: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' }]),
          ...(role.role === 'admin'
            ? [{ path: '/admin/post-job', icon: <SquarePlus />, label: 'Post Job' }]
            : []),
          { path: '/jobs', icon: <Briefcase />, label: 'Jobs' },
          ...(role.role === 'user'
            ? [{ path: '/inbox', icon: <Bell />, label: 'Inbox' }]
            : []),
        ].map(({ path, icon, label }) => (
          <Link to={path} key={path}>
            <div
              className={`
                flex items-center p-3 rounded-xl transition-all duration-300
                ${sidebarValue === path
                  ? 'bg-blue-500 text-white font-semibold scale-[1.03]'
                  : 'hover:bg-gray-200 text-black'}
                ${openSidebar ? 'justify-start' : 'justify-center'}
              `}
            >
              <span className="text-xl">{icon}</span>
              {openSidebar && <span className="pl-3 text-sm md:text-base">{label}</span>}
            </div>
          </Link>
        ))}

        {/* Logout */}
        <div
          onClick={logOut}
          className={`
            flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer
            hover:bg-gray-200 text-black
            ${openSidebar ? 'justify-start' : 'justify-center'}
          `}
        >
          <span className="text-xl"><LogOut /></span>
          {openSidebar && <span className="pl-3 text-sm md:text-base">Logout</span>}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
