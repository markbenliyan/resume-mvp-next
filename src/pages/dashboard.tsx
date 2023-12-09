import React, { useRef } from 'react';
import Resume from '../components/Resume.jsx';
import ResumePDF from '../components/ResumePDF.jsx';
import FormatSidebar from '../components/FormatSidebar.jsx'
import Nav from '../components/Nav.jsx'
import { PDFDownloadLink, Document, Page, pdf, PDFRenderer, PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';



export default function Dashboard() {

  const downloadPdf = async () => {
    const asPdf = pdf(<ResumePDF />);
    const blob = await asPdf.toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume.pdf'; // the download file name
    link.click();

    // URL.revokeObjectURL(url);
  };

  return (
    <>
      <Nav />
      <div className="h-screen flex py-5 px-10 bg-gray-50">
        <div className='w-1/4'>
          <FormatSidebar />
        </div>
        {/* <ResumePDF /> */}
        <Resume editable={true} />
        <button onClick={downloadPdf}>Download</button>

        <div>
          {/* Your content for the third 25% column */}
        </div>
      </div>
    </>
  );
}
