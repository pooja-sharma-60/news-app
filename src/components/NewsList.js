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

// console.log("Fetching stories.... ");
// const newStories = await fetchTopStories();

// if (newStories.length > 0) {
//   const latestStory = newStories[0];
//   if (!newsList.some((story) => story.url === latestStory.url)) {
//     console.log("Adding a new story:", latestStory.title);

//     setNewsList((prevNews) => {
//       const updatedNews = [latestStory, ...prevNews].slice(0, 10);
//       console.log(updatedNews);
//       localStorage.setItem("newsList", JSON.stringify(updatedNews));
//       return updatedNews;
//     });
//   } else{
//       console.log("Story already exists, skipping: " , latestStory.title)
//   }
// } else{
//   console.log("No new stories fetched")
// }
