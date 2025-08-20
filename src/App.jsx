import { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import HomeScreen from './HomeScreen/HomeScreen'
import 'react-toastify/dist/ReactToastify.css';
import BookmarkProvider from './ContextAPI/Bookmark/ContextProvider';

import FilterdProvider from './ContextAPI/FilteredJobs/ContextProvider';
import ChartProvider from './ContextAPI/Chart/contextProvider';
import SearchedJobProvider from './ContextAPI/SearchedJobs/ContextProvider';
import NotificationProvider from './ContextAPI/Notifications/ContextProvider';
import MiscProvider from './ContextAPI/Misc/ContextProvider';
function App() {
  

  return (
    <>
    <MiscProvider>
    <NotificationProvider>
    <SearchedJobProvider>
    <FilterdProvider>
  
    <BookmarkProvider>
    <ChartProvider>
    <HomeScreen/>
    <ToastContainer position='top-right' autoClose={3000}/>
    </ChartProvider>
    </BookmarkProvider>

    </FilterdProvider>
    </SearchedJobProvider>
    </NotificationProvider>
    </MiscProvider>
    </>
  )
}

export default App
