/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Comment from './Comment';

interface LoadedResumeViewProps {
  pdfUrl: string;
}

const LoadedResumeView: React.FC<LoadedResumeViewProps> = ({ pdfUrl }) => {
  return (
    <div className='mt-4 w-[95%] grid grid-cols-3 gap-4'>
      {/* Renders PDF via generated URL */}
      <object
        className="col-span-2"
        width="100%"
        height="800"
        data={pdfUrl}
        type="application/pdf">
      </object>

      {/* Comments list */}
      <div className='col-span-1 flex flex-col'>
        <Comment
          author="Mark Benliyan"
          date="20 April 2022, at 14:88 PM"
          avatarUrl="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam vero adipisci beatae voluptas dolor ame."
        />
        <Comment
          author="Mark Benliyan"
          date="20 April 2022, at 14:88 PM"
          avatarUrl="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png"
          content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quisquam vero adipisci beatae voluptas dolor ame."
        />

      </div>
    </div>
  );
};

export default LoadedResumeView;
