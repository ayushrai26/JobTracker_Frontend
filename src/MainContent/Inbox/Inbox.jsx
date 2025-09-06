import React, { useEffect, useContext } from 'react';
import { IoIosNotifications } from "react-icons/io";
import MessageUi from './MessageUi';
import { NotificationContext } from '../../ContextAPI/Notifications/CreateContext';
import empty from '../../assets/empty.json';
import Lottie from 'lottie-react';

function Inbox() {
  const { notifications, setNotifications, shouldfetch } = useContext(NotificationContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const getNotification = async () => {
      try {
        const response = await fetch(
          `https://jobtracker-backend-ql5b.onrender.com/getNotification/${user.id}`,
          { method: 'GET' }
        );
        const data = await response.json();
        setNotifications(data.notifications);
      } catch (err) {
        console.log(err);
      }
    };
    getNotification();
  }, [shouldfetch, setNotifications]);

  return (
    <div className="ml-20 mt-5 flex flex-col w-[80%] mx-auto">
      
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <div className="flex items-center space-x-2">
          <IoIosNotifications className="text-3xl text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        </div>
        {notifications?.length > 0 && (
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {notifications.length} new
          </span>
        )}
      </div>

      
      <div className="space-y-4">
        {Array.isArray(notifications) && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition duration-300"
            >
              <MessageUi
                company={notification.company}
                skill={notification.skill}
                id={notification._id}
                time={notification.cr}
              />
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                {new Date(notification.cr).toLocaleDateString()} •{" "}
                {new Date(notification.cr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))
        ) : (
          
          <div className="flex flex-col items-center justify-center mt-20 text-gray-600">
            <div className="w-64 h-64">
              <Lottie animationData={empty} loop={true} />
            </div>
            <h1 className="text-2xl font-semibold mt-4">No Inbox Yet</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your job-related notifications will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inbox;
