import React from 'react'
import { Navigate } from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
function ProtectedRoutes({children}) {
 
    const token = localStorage.getItem('token')
    if(!token || token === 'undefined'){
        return <Navigate to='/login'/>
    }

    try{
    const decoded = jwtDecode(token)
    const isExpire = decoded.exp*1000 < Date.now();
    if(isExpire){
      localStorage.removeItem('token');
      return <Navigate to='/login'/>
    }
    }catch(err){
     localStorage.removeItem('token');
    return <Navigate to='/login'/>
    }

  return (
    
    children
  )
}

export default ProtectedRoutes