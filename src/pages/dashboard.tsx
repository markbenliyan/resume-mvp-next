import React from 'react';
import Resume from '../components/Resume.jsx';
import FormatSidebar from '../components/FormatSidebar.jsx'

export default function Dashboard() {
  return (
    <div className="h-screen flex m-10">
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
  );
}
