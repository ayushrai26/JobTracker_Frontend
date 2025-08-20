import React from 'react'
import { MiscFunctionality } from './createContext'
import { useState } from 'react'
function MiscProvider({children}) {


      const [applicationStatus,setApplicationStatus] = useState([])
      const [shortlistedCandidate,setShortlistedCandidate] = useState([])
      const [interviewScheduledCandidates,setInterviewScheduledCandidates] = useState([])
      const [appliedButton,setAppliedButton] = useState(null)
      const [selectedCandidates,setSelectedCandidates] = useState([])
      const [rejectedCandidates,setRejectedCandidates] = useState([])
      const [interviewedCandidates,setInterviewedCandidates] = useState([])
      const [underReviewCandidates,setUnderReviewCandidates] = useState([])
      
  return (

    <MiscFunctionality.Provider value={{applicationStatus,setApplicationStatus,shortlistedCandidate,setShortlistedCandidate,
      interviewScheduledCandidates,setInterviewScheduledCandidates,appliedButton,setAppliedButton,selectedCandidates,setSelectedCandidates,
      rejectedCandidates,setRejectedCandidates,interviewedCandidates,setInterviewedCandidates,underReviewCandidates,setUnderReviewCandidates
    }}>
        {children}
    </MiscFunctionality.Provider>
  )
}

export default MiscProvider