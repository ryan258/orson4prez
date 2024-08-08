import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GenerateButton from './components/GenerateButton';
import NewsHeadlines from './components/NewsHeadlines';
import CharacterBio from './components/CharacterBio';
import './App.css';

function App() {
  // State to hold posts data
  const [posts, setPosts] = useState({});
  // State to hold news data
  const [news, setNews] = useState([]);
  // State to track if data is currently being loaded
  const [isLoading, setIsLoading] = useState(true);
  // State to hold any error messages
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    fetchLatestPosts();
  }, []);

  // Function to fetch the latest posts and news
  const fetchLatestPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/latest-posts');
      if (!response.ok) {
        throw new Error('Failed to fetch latest posts');
      }
      const data = await response.json();
      // Update state with fetched data, using empty objects/arrays as fallbacks
      setPosts(data.posts || {});
      setNews(data.news || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      setError('Failed to load the latest campaign updates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle generating new posts
  const handleGeneratePosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-posts', { method: 'POST' });
      if (!response.ok) {
        throw new Error('Failed to generate new posts');
      }
      const data = await response.json();
      setPosts(data.posts || {});
      setNews(data.news || []);
      setError(null);
    } catch (error) {
      console.error('Error generating new posts:', error);
      setError('Failed to generate new campaign updates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render loading state if data is being fetched
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  // Render error message if there's an error
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Main render when data is loaded successfully
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Dashboard posts={posts} />
        <GenerateButton onGenerate={handleGeneratePosts} isLoading={isLoading} />
        <NewsHeadlines news={news} />
        <CharacterBio />
      </main>
    </div>
  );
}

export default App;