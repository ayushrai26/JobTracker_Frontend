import React from 'react'
import { useEffect } from 'react';
import { IoIosNotifications } from "react-icons/io";
import MessageUi from './MessageUi';
import { useContext } from 'react'
import { NotificationContext } from '../../ContextAPI/Notifications/CreateContext'
import empty from '../../assets/empty.json'
import Lottie from 'lottie-react';
function Inbox() {
   const {notifications,setNotifications,shouldfetch} = useContext(NotificationContext)
   useEffect(()=>{
    const userId = JSON.parse(localStorage.getItem('user'));
       const getNotification = async()=>{
         try{
           const response = await fetch(`http://localhost:3000/getNotification/${userId.id}`,{
           method:'GET'
         })
         const data = await response.json();
         console.log('notification data',data)
         setNotifications(data.notifications);
         }catch(err){console.log(err)}
         
       }
       getNotification()
     },[shouldfetch])

  return (
    <div className='ml-16 mt-5 flex flex-col items-center justify-center '>
      <div className='flex items-center '>
      <h1 className='text-2xl font-bold ml-2'>Notifications</h1>
      <div className='text-2xl'><IoIosNotifications /></div>
      
       
       </div>
       <div className='mt-2.5'>
       {
  Array.isArray(notifications) && notifications.length > 0 ? (
    notifications.map((notification, index) => (
      <MessageUi key={index} company={notification.company} skill={notification.skill} id={notification._id} time={notification.cr} />
    ))
  ) : (
    <div className='w-100 h-100 flex flex-col items-center justify-center'>
      <Lottie animationData={empty} loop={true} />
      <h1 className='text-2xl'>No Inbox</h1>
    </div>
  )
}

        
      </div>
    </div>
  )
}

export default Inbox