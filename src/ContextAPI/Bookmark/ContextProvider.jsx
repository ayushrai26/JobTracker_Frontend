import { useState,useEffect } from "react";
import { BookmarkContext } from "./CreateContext";

const BookmarkProvider = ({ children }) => {
  
   const [isBookmarked,setIsBookmarked] = useState(null)

 

  return (
    <BookmarkContext.Provider value={{isBookmarked,setIsBookmarked}}>
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkProvider;
