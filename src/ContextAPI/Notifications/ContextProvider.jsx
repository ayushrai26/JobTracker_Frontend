import React, { useState, useEffect } from 'react';
import { NotificationContext } from './CreateContext';

function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [shouldfetch,setShouldfetch] = useState(false)

  const[read,setRead] = useState(false)
  

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications ,setShouldfetch,shouldfetch,read,setRead}}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationProvider;
