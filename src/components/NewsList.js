import React, { useEffect, useState } from "react";
import { fetchTopStories } from "../services/newsService";
import NewsItem from "./NewsItem";

const NewsList = () => {
  const [newsList, setNewsList] = useState(() => {
    const savedNews = JSON.parse(localStorage.getItem("newsList"));
    return savedNews || [];
  });
//   console.log(newsList)
  useEffect(() => {
    const fetchAndAddNews = async () => {
      const newStories = await fetchTopStories();
    //    console.log(newStories)
      if (newStories.length > 0) {
        const latestStory = newStories[0];
        if (!newsList.some(story => story.url === latestStory.url)) {
            console.log("inside if")
          setNewsList((prevNews) => {
            const updatedNews = [latestStory, ...prevNews].slice(0, 10);
            console.log(updatedNews)
            localStorage.setItem('newsList', JSON.stringify(updatedNews));
            return updatedNews;
          });
        }
      }
    };

    fetchAndAddNews(); 

    const interval = setInterval(fetchAndAddNews, 6000); 
    return () => clearInterval(interval);
  }, [newsList]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {newsList.map((story, index) => (
        <NewsItem key={index} story={story} />
      ))}
    </div>
  );
};

export default NewsList;
