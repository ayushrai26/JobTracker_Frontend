import React from 'react'
import { SearchedJobContext } from './CreateContext'
import { useState } from 'react';
function SearchedJobProvider({children}) {
  const [searchedJob,setSearchedJob] = useState([]);
  const [suggestion,setSuggestion] = useState([]);
  return (
    <SearchedJobContext.Provider value={{searchedJob,setSearchedJob,suggestion,setSuggestion}}>
        {children}
    </SearchedJobContext.Provider>
  )
}

export default SearchedJobProvider