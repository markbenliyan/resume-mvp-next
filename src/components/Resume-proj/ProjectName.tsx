/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const ProjectName: React.FC = () => {
  return (
    <div className='flex gap-1 text-lg font-bold'>
      <h1>Mark's Resume Reviews</h1>
      <div className='bg-yellow-100 mt-0.5 flex items-center rounded py-0.5 px-2 h-fit flex-start'>
        <p className='text-red-600 text-xs'>BETA</p>
      </div>
    </div>
  );
};

export default ProjectName;
