import React from 'react'
import { useState } from 'react'
import { filteredContext } from './createContext'
function FilterdProvider({children}) {

 const [filtered,setFilterd] = useState([])

  return (
    <filteredContext.Provider value={{filtered,setFilterd}}>
        {children}
    </filteredContext.Provider>
  )
}

export default FilterdProvider