import React, { useState } from 'react'
import { ChartContext } from './createContext'
function ChartProvider({children}) {
    const [isActive,setIsActive] = useState('availableApplications');
  return (
     <ChartContext.Provider value={{isActive,setIsActive}}>
     {children}
     </ChartContext.Provider>
  )
}

export default ChartProvider