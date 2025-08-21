import React, { useContext } from 'react';
import Filter from './Filter.jsx';
import Cards from '../Jobs/Cards';
import { filteredContext } from '../../ContextAPI/FilteredJobs/createContext.js';
import Lottie from 'lottie-react';
import filteredimage from '../../assets/Animation - 1751543953253.json';

function FilterJobs() {
  const { filtered } = useContext(filteredContext);
  console.log('flyetee', filtered);

  return (
    <div className="flex flex-col md:flex-row h-full w-full shadow-2xl bg-gray-50 rounded-2xl overflow-hidden">
      {/* Sidebar Filter */}
      <div className="md:w-1/4 w-full md:sticky top-4 h-fit max-h-[90vh] overflow-auto bg-white p-4 border-r shadow-sm">
        <Filter />
      </div>

      {/* Job Cards Section */}
      <div className="flex-1 flex flex-wrap justify-center p-4 gap-6">
        {filtered && filtered.length > 0 ? (
          filtered.map((job, index) => (
            <Cards key={index} job={job} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-[60vh]">
            <div className="w-64 h-64">
              <Lottie animationData={filteredimage} loop={true} />
            </div>
            <h1 className="font-bold text-xl md:text-2xl text-blue-500 mt-4 text-center">
              No Jobs Found for the Selected Filters
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterJobs;
