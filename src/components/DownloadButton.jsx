import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/20/solid';

function DownloadButton() {
  const downloadPDF = async () => {
    const res = await fetch('http://localhost:3001/pdf');
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'output.pdf');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  return (
    <button
      type="button"
      className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={downloadPDF}
    >
      <ArrowDownTrayIcon className="-ml-0.5 h-4 w-4" aria-hidden="true" />
      Download
    </button>
  );
}

export default DownloadButton;
