import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import GenerateButton from './components/GenerateButton';
import NewsHeadlines from './components/NewsHeadlines';
import CharacterBio from './components/CharacterBio';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    setIsLoading(true);
    setProgress(0);
    try {
      const response = await fetch('/api/latest-posts');
      if (!response.ok) {
        throw new Error('Failed to fetch latest posts');
      }
      const reader = response.body.getReader();
      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      let chunks = [];

      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        setProgress(Math.round((receivedLength / contentLength) * 100));
      }

      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for(let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const data = JSON.parse(new TextDecoder("utf-8").decode(chunksAll));
      setPosts(data.posts);
      setError(null);
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      setError('Failed to load the latest campaign updates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePosts = async () => {
    setIsLoading(true);
    setProgress(0);
    try {
      const response = await fetch('/api/generate-posts', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to generate new posts');
      }
      const reader = response.body.getReader();
      const contentLength = +response.headers.get('Content-Length');
      let receivedLength = 0;
      let chunks = [];

      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        setProgress(Math.round((receivedLength / contentLength) * 100));
      }

      let chunksAll = new Uint8Array(receivedLength);
      let position = 0;
      for(let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
      }

      const data = JSON.parse(new TextDecoder("utf-8").decode(chunksAll));
      setPosts(data.posts);
      setError(null);
    } catch (error) {
      console.error('Error generating new posts:', error);
      setError('Failed to generate new campaign updates. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Oval
          height={80}
          width={80}
          color="#ff4500"
          visible={true}
          ariaLabel='oval-loading'
          secondaryColor="#ff4500"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <p>Loading... {progress}%</p>
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Dashboard posts={posts} />
        <GenerateButton onGenerate={handleGeneratePosts} isLoading={isLoading} />
        <NewsHeadlines news={posts.map(post => post.news)} />
        <CharacterBio />
      </main>
    </div>
  );
}

export default App;