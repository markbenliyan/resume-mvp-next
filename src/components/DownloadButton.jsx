import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

function DownloadButton() {
  const downloadPDF = async () => {
    try {
      const res = await fetch('/api/downloadpdf');
      if (!res.ok) { // if HTTP-status is 200-299
        // get the error message from the server,
        // server response is here in res.text()
        console.error(`An error occurred: ${res.status}`);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  return (
    <button
      type="button"
      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={downloadPDF}
    >
      <ArrowDownTrayIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      Download Resume
    </button>
  );
}

export default DownloadButton;
