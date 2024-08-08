require('dotenv').config();
const express = require('express');
const path = require('path');
const cron = require('node-cron');
const fs = require('fs');
const NewsFetcher = require('./agents/newsFetcher');
const OrsonAI = require('./agents/orsonAI');
const Scriptwriter = require('./agents/scriptwriter');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json

const newsFetcher = new NewsFetcher();
const orsonAI = new OrsonAI();
const scriptwriter = new Scriptwriter();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Simple logging function
function logOutput(output) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('orson4prez.log', `${timestamp}:\n${JSON.stringify(output, null, 2)}\n\n`);
}

let latestPosts = {};
let latestNews = [];

// Schedule news fetching every 6 hours
cron.schedule('0 */6 * * *', async () => {
  try {
    await generateNewContent();
  } catch (error) {
    console.error(`Error in scheduled task: ${error.message}`);
  }
});

async function generateNewContent() {
  const news = await newsFetcher.fetchLatestNews();
  if (news.length > 0) {
    const orsonPersonality = await orsonAI.generatePersonality();
    const scripts = await scriptwriter.createScripts(news, orsonPersonality);
    logOutput(scripts);
    latestPosts = scripts;
    latestNews = news;
    console.log('Generated new posts for all platforms');
    return { posts: scripts, news: news };
  }
  return null;
}

// API route to get the latest posts and news
app.get('/api/latest-posts', (req, res) => {
  res.json({ posts: latestPosts, news: latestNews });
});

// API route to generate new posts
app.post('/api/generate-posts', async (req, res) => {
  try {
    const result = await generateNewContent();
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ error: 'No news available to generate posts' });
    }
  } catch (error) {
    console.error(`Error generating posts: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate posts' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

app.listen(port, () => {
  console.log(`orson4prez campaign server listening at http://localhost:${port}`);
});