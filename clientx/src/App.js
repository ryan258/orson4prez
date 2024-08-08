// App.js
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { GenerateButton } from './components/GenerateButton';
import { NewsHeadlines } from './components/NewsHeadlines';
import { CharacterBio } from './components/CharacterBio';

export default function App() {
  const [posts, setPosts] = useState({});
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const response = await fetch('/api/latest-posts');
      const data = await response.json();
      setPosts(data.posts);
      setNews(data.news);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
    }
  };

  const handleGeneratePosts = async () => {
    try {
      const response = await fetch('/api/generate-posts', { method: 'POST' });
      const data = await response.json();
      setPosts(data.posts);
      setNews(data.news);
    } catch (error) {
      console.error('Error generating new posts:', error);
    }
  };

  return (
    <div className="app">
      <Header />
      <main>
        <Dashboard posts={posts} />
        <GenerateButton onGenerate={handleGeneratePosts} />
        <NewsHeadlines news={news} />
        <CharacterBio />
      </main>
    </div>
  );
}