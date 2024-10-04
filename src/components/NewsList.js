import React, { useEffect, useState } from "react";
import { fetchTopStories } from "../services/newsService";
import NewsItem from "./NewsItem";

const MAX_NEWS_COUNT = 10;
const NewsList = () => {
  const [newsList, setNewsList] = useState(() => {
    const savedNews = JSON.parse(localStorage.getItem("newsList"));
    return savedNews || [];
  });

  useEffect(() => {
    const fetchAndAddNews = async () => {
      try {
        const stories = await fetchTopStories();

        const randomIndex = Math.floor(Math.random() * stories.length);

        const topStory = stories[randomIndex];
        console.log(randomIndex)
        setNewsList((prevNews) => {
            const updatedNews = [topStory, ...prevNews.slice(0, MAX_NEWS_COUNT - 1)];
            localStorage.setItem("newsList", JSON.stringify(updatedNews));
            return updatedNews;
          });
      } catch (error) {
        console.error('Failed to fetch the news:', error);
      }
    };

    fetchAndAddNews();

    const interval = setInterval(() => {
      console.log("Fetching new story on interval...");
      fetchAndAddNews();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {newsList.map((story, index) => (
        <NewsItem key={index} story={story} />
      ))}
    </div>
  );
};

export default NewsList;
