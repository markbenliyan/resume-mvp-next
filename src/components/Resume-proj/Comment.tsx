/* eslint-disable @next/next/no-img-element */
import React from 'react';

interface CommentProps {
  author: string;
  date: string;
  avatarUrl: string;
  content: string;
}

const Comment: React.FC<CommentProps> = ({
  author,
  date,
  avatarUrl,
  content
}) => {
  return (
    <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
      <div className="relative flex gap-4">
        <img src={avatarUrl} className="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt={author} loading="lazy" />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">{author}</p>
            <a className="text-gray-500 text-xl" href="#"><i className="fa-solid fa-trash"></i></a>
          </div>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>
      <p className="-mt-4 text-gray-500">{content}</p>
    </div>
  );
};

export default Comment;
