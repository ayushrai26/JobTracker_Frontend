import React, { useContext } from 'react'
import { SearchedJobContext } from '../../ContextAPI/SearchedJobs/CreateContext'
import Cards from './Cards'

function SearchedJobs() {
  const { searchedJob } = useContext(SearchedJobContext)
  const { suggestion } = useContext(SearchedJobContext)
  console.log(searchedJob)

  return (
    <div className="ml-4 sm:ml-8 md:ml-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {searchedJob.length > 0 ? (
        searchedJob.map((job, index) => {
          console.log(job)
          return <Cards key={index} job={job} />
        })
      ) : (
        <div className="col-span-full text-center text-lg font-semibold">
          No searched job found
        </div>
      )}
    </div>
  )
}

export default SearchedJobs
