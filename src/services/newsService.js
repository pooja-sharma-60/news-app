const url = `${process.env.REACT_APP_API_URL}?api-key=${process.env.REACT_APP_API_KEY}`;

export const fetchTopStories = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return data.results
    } catch (error) {
      console.error(error);
      return [];
    }
  };