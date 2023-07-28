import React from 'react';

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
    <button onClick={downloadPDF}>
      Download PDF
    </button>
  );
}

export default DownloadButton;
