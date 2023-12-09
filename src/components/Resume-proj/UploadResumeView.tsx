/* eslint-disable @next/next/no-img-element */
import React, { DragEvent, ChangeEvent, useState } from 'react';
import { DocumentPlusIcon } from '@heroicons/react/24/solid';

interface UploadResumeViewProps {
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleDrop: (event: DragEvent<HTMLDivElement>) => void;
}

const UploadResumeView: React.FC<UploadResumeViewProps> = ({
  handleFileChange,
  handleDrop,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);

  // calls the parent handleDrop but also sets isDragOver to false
  const handleDraggingDrop = (event: DragEvent<HTMLDivElement>) => {
    handleDrop(event);
    setIsDragOver(false);
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
  };

  // Determine drag area style
  const dragAreaStyle = isDragOver ? { borderColor: 'lightgreen' } : {};

  return (
    <> 
      {/* marks pfp w/ upload resume CTA */}
      <div className="flex flex-col items-center gap-3 max-w-[50%] mt-28">
        <img
          className="inline-block shadow-md h-16 w-16 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className='flex gap-1 text-xl font-bold'>
          <h1>
            Which resume can I review for you?
          </h1>
        </div>
      </div>
      {/* file uploader */}
      <div className="mt-16 flex justify-center">
        <div
          className="flex justify-center rounded-lg border-4 border-dashed border-gray-900/25 px-32 pt-16 pb-24"
          style={dragAreaStyle}
          onDrop={handleDraggingDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-center">
            <DocumentPlusIcon className="mx-auto h-16 w-16 text-gray-300" aria-hidden="true" />
            <div className="mt-4 flex text-lg leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a resume</span>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="application/pdf" onChange={handleFileChange} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-md leading-5 text-gray-600">PDF up to 10MB</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadResumeView;
