import React from 'react';

const NewsItem = ({ story }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">

      <div className="text-lg font-bold text-gray-900">
        {story.title}
      </div>
      <div className="text-gray-700 mt-2 mb-4">
        {story.abstract}
      </div>
        {story.multimedia && story.multimedia.length > 0 && (
               
                    <img 
                src={story.multimedia[0].url} 
                alt={story.title} 
                className="w-full h-48 object-cover rounded mb-2"
                />
               
            )}

    </div>
  );
};

export default NewsItem;