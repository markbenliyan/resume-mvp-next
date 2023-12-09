/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { DocumentPlusIcon } from '@heroicons/react/24/solid';
import { ChangeEvent, DragEvent, useEffect, useState } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import CurrentUserIcon from '../components/Resume-proj/CurrentUserIcon';
import ProjectName from '../components/Resume-proj/ProjectName';
import LoadedResumeView from '../components/Resume-proj/LoadedResumeView';
import UploadResumeView from '../components/Resume-proj/UploadResumeView';

export default function ResumeDrop() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFile(event.target.files);
  };

  const processFile = (files: FileList | null) => {
    if (files && files[0]) {
      const uploadedFile = files[0];
      if (uploadedFile.type === "application/pdf") {
        setFile(uploadedFile);
        setPdfUrl(URL.createObjectURL(uploadedFile));
        setIsLoading(true); // Start loading
      } else {
        alert("Please upload a PDF file.");
      }
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    processFile(event.dataTransfer.files);
  };

  // Add an additional useEffect for loading
  useEffect(() => {
    if (pdfUrl) {
      const timer = setTimeout(() => {
        setIsLoading(false); // Stop loading once the PDF is ready to be rendered
      }, 1000); // Adjust time as needed
      return () => clearTimeout(timer);
    }
  }, [pdfUrl]);

  useEffect(() => {
    // This function is called when the component mounts and
    // anytime the values in the dependency array (pdfUrl or file) change.

    // The return function here is the cleanup function.
    // It's called when the component unmounts and before the effect runs again
    // (if pdfUrl or file changes).
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
        // This line revokes the object URL to free up memory
        // since it's no longer needed after the component unmounts or the file changes.
      }
    };
  }, [pdfUrl, file]); // Dependency array - the effect will re-run when these values change


  return (
    <div className='flex flex-col w-screen h-screen bg-gray-50 items-center'>
      <div className="w-full hidden justify-between md:flex px-5 pt-3 md:flex-shrink-0 md:items-center ">
        <ProjectName />
        <CurrentUserIcon />
      </div>
      {isLoading ? <LoadingSpinner /> : (
        pdfUrl ? <LoadedResumeView pdfUrl={pdfUrl} /> :
          <UploadResumeView handleFileChange={handleFileChange} handleDrop={handleDrop} />
      )}
    </div >
  );


}
