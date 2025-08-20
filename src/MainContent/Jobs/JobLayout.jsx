import React from 'react';
import { Outlet } from 'react-router-dom'; // ⬅ make sure it's from react-router-dom

function JobLayout() {
  return (
    <div className="flex flex-col w-full overflow-y-auto"> {/* wrap with container */}
      <Outlet />
    </div>
  );
}

export default JobLayout;
