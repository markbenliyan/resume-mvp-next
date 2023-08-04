import React from 'react';
import Resume from '../components/Resume.jsx';
import FormatSidebar from '../components/FormatSidebar.jsx'
import Nav from '../components/Nav.jsx'

export default function Dashboard() {
  return (
    <>
      <Nav />
      <div className="h-screen flex py-5 px-10 bg-gray-50">
        <div className='w-1/4'>
          <FormatSidebar />
        </div>
        <Resume editable={true} scale={0.75} />
        <div>
          {/* Your content for the third 25% column */}
        </div>
      </div>
    </>
  );
}
