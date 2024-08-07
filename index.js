require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const fs = require('fs');
const NewsFetcher = require('./agents/newsFetcher');
const OrsonAI = require('./agents/orsonAI');
const Scriptwriter = require('./agents/scriptwriter');

const app = express();
const port = process.env.PORT || 3000;

const newsFetcher = new NewsFetcher();
const orsonAI = new OrsonAI();
const scriptwriter = new Scriptwriter();

// Simple logging function
function logOutput(output) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('orson4prez.log', `${timestamp}:\n${JSON.stringify(output, null, 2)}\n\n`);
}

// Schedule news fetching every 6 hours
cron.schedule('0 */6 * * *', async () => {
  try {
    const news = await newsFetcher.fetchLatestNews();
    if (news.length > 0) {
      const orsonPersonality = await orsonAI.generatePersonality();
      const scripts = await scriptwriter.createScripts(news, orsonPersonality);
      logOutput(scripts);
      // Here you would integrate with social media APIs to post the content
      console.log('Generated new posts for all platforms');
    }
  } catch (error) {
    console.error(`Error in scheduled task: ${error.message}`);
  }
});

app.get('/generate-posts', async (req, res) => {
  try {
    const news = await newsFetcher.fetchLatestNews();
    const orsonPersonality = await orsonAI.generatePersonality();
    const scripts = await scriptwriter.createScripts(news, orsonPersonality);
    logOutput(scripts);
    res.json(scripts);
  } catch (error) {
    console.error(`Error generating posts: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate posts' });
  }
});

app.listen(port, () => {
  console.log(`orson4prez campaign server listening at http://localhost:${port}`);
});