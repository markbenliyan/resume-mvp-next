import React from 'react';
import Resume from '../components/Resume.jsx';
import FormatSidebar from '../components/FormatSidebar.jsx'
import Nav from '../components/Nav.jsx';

export default function Home() {
  return (
    <div className="h-screen">
      <Nav />
      <div className="flex h-full">
        <div className="w-1/2">
          <FormatSidebar />
        </div>
        <div>
          <Resume editable={true} />
        </div>
        {/* <div style={{ height: 900 }}>
          <PDFViewer style={{ height: '100%', width: '100%' }}>
            <Resume2 style={{ height: 900 }} />
          </PDFViewer>
        </div> */}
      </div>
    </div>
  );
}
