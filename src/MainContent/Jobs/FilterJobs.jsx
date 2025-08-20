import React, { useContext } from 'react';
import Filter from '../Jobs/filter';
import Cards from '../Jobs/Cards';
import { filteredContext } from '../../ContextAPI/FilteredJobs/createContext.js';
import Lottie from 'lottie-react'
import filteredimage from '../../assets/Animation - 1751543953253.json'
function FilterJobs() {
  const { filtered } = useContext(filteredContext);
  console.log('flyetee',filtered)
  return (
    <div className='flex h-full w-full shadow-2xl'>
      <div className='sticky top-4 h-fit max-h-[90vh] overflow-auto'>
      <Filter />
      </div>
      <div className='flex flex-wrap'>
        {filtered && filtered.length > 0 ? (
          filtered.map((job)=>(

            <Cards job = {job}/>
          ))
          
        ) : (
          <div className='flex flex-col items-center justify-center h-full'>
            <Lottie animationData={filteredimage} loop={true}/>
          

          <h1 className='font-bold text-2xl text-blue-400'>No Jobs Found for the selected filters</h1>
        </div>
        )}
      </div>
    </div>
  );
}

export default FilterJobs;
