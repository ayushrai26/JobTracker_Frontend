import React from 'react'
import { useContext } from 'react'
import { SearchedJobContext } from '../../ContextAPI/SearchedJobs/CreateContext'
import Cards from './Cards'
function SearchedJobs() {
   const {searchedJob} = useContext(SearchedJobContext)
   const {suggestion} = useContext(SearchedJobContext)
   console.log(searchedJob)
  return (
    <div className='ml-16 grid grid-cols-3'>
      {searchedJob.length>0?(
        searchedJob.map((job,index)=>{
        console.log(job)
       return <Cards key={index} job={job}/>}
      )):(<div>No searched job found</div>)}
      
      </div>
  )
}

export default SearchedJobs