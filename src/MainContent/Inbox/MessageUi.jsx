import React from 'react'
import { useContext,useState } from 'react';
import { FaCheckDouble } from "react-icons/fa6";
import { NotificationContext } from '../../ContextAPI/Notifications/CreateContext';
function MessageUi({company,skill,id}) {

  const now = Date.now();
  const date = new Date(now);
  const time  = date.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit',
    hour12:true
  });
               const {setShouldfetch,setRead,read} =   useContext(NotificationContext)
  const handleDelete =async()=>{
    console.log(id)
      try{
          const response =    await fetch(`https://jobtracker-backend-ql5b.onrender.com/deleteNotification/${id}`,{
                method:'DELETE'
              })
              if(response.ok){
                console.log('Notification deleted')
                setShouldfetch(prev=>!prev)

              }else{
                console.log('Error deleting notification')
              }
      }catch(err){
         console.log('error')
      }
  }
  const handleRead = ()=>{
    
  }
  return (
    <div className={read?'bg-gray-400 p-2 flex items-center gap-5':'bg-gray-200 p-2 flex items-center gap-5'}>
      <div className='h-10 w-10 bg-amber-300 flex items-center justify-center font-bold'>{company[0].toUpperCase()}</div>
      <div className='w-full'>
        <div className='flex items-center justify-between p-1'><h1 className='text-lg'>Succefully Applied</h1> <span className='mr-10'>{time}</span></div>
        
        <p className='p-1'>Your application for {skill} at {company} has been submitted</p>
        <div className='flex justify-between p-2'><span className='bg-amber-200 p-2 rounded-2xl text-sm font-medium cursor-pointer ' 
        onClick={handleRead}>{read?(<span className='flex items-center'> Read <FaCheckDouble /></span>):
        (<span>Mark as Read</span>)}</span><span className='mr-10 bg-red-600 p-1.5 text-sm font-medium text-white rounded-2xl cursor-pointer' onClick={handleDelete}>Delete</span></div>
      </div>
      
        
    </div>
  )
}

export default MessageUi