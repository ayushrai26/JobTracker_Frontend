import React, { useContext } from 'react';
import { FaCheckDouble } from "react-icons/fa6";
import { NotificationContext } from '../../ContextAPI/Notifications/CreateContext';

function MessageUi({ company, skill, id, time }) {
  const { setShouldfetch, read, setRead } = useContext(NotificationContext);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://jobtracker-backend-ql5b.onrender.com/deleteNotification/${id}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        console.log('Notification deleted');
        setShouldfetch(prev => !prev);
      } else {
        console.log('Error deleting notification');
      }
    } catch (err) {
      console.log('Error deleting notification', err);
    }
  };

  const handleRead = () => {
    setRead(true); // ✅ update context state
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 mb-3 rounded-xl shadow-sm transition-all duration-200
        ${read ? 'bg-gray-100' : 'bg-white border-l-4 border-blue-500'}
      `}
    >
      {/* Avatar */}
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-lg shadow">
        {company[0]?.toUpperCase()}
      </div>

      {/* Notification Content */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold text-gray-800">
            Successfully Applied 🎉
          </h1>
          <span className="text-xs text-gray-500">{time}</span>
        </div>

        <p className="mt-1 text-sm text-gray-600 leading-snug">
          Your application for <span className="font-medium">{skill}</span> at{" "}
          <span className="font-medium">{company}</span> has been submitted.
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-3 text-sm">
          <button
            onClick={handleRead}
            className={`px-3 py-1.5 rounded-full font-medium flex items-center gap-2 transition-all duration-200
              ${read
                ? "bg-green-100 text-green-700 cursor-default"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"}
            `}
          >
            {read ? (
              <>
                Read <FaCheckDouble className="text-green-600" />
              </>
            ) : (
              "Mark as Read"
            )}
          </button>

          <button
            onClick={handleDelete}
            className="px-3 py-1.5 rounded-full font-medium bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessageUi;
