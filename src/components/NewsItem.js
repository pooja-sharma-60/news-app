import React from 'react';

const NewsItem = ({ story }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="text-lg font-semibold text-gray-900">
        {story.title}
      </div>
      <div className="text-gray-700 mt-2">
        {story.abstract}
      </div>
      <a
        href={story.url}
        className="text-blue-500 mt-4 inline-block"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsItem;