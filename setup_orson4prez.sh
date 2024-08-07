#!/bin/bash

# Create project directory
mkdir orson4prez
cd orson4prez

# Create main application file
cat > index.js << EOL
require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const NewsFetcher = require('./agents/newsFetcher');
const OrsonAI = require('./agents/orsonAI');
const Scriptwriter = require('./agents/scriptwriter');

const app = express();
const port = process.env.PORT || 3000;

const newsFetcher = new NewsFetcher();
const orsonAI = new OrsonAI();
const scriptwriter = new Scriptwriter();

// Schedule news fetching every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('Fetching news for Orson\'s campaign...');
  // Add your scheduled task logic here
});

app.get('/generate-post', async (req, res) => {
  // Add your post generation logic here
  res.json({ message: 'Post generation endpoint' });
});

app.listen(port, () => {
  console.log(\`orson4prez campaign server listening at http://localhost:\${port}\`);
});
EOL

# Create agents directory and agent files
mkdir agents
cd agents

# Create newsFetcher.js
cat > newsFetcher.js << EOL
const axios = require('axios');

class NewsFetcher {
  constructor() {
    this.apiKey = process.env.NEWS_API_KEY;
    this.apiUrl = 'https://newsapi.org/v2/top-headlines';
  }

  async fetchLatestNews() {
    // Add your news fetching logic here
  }
}

module.exports = NewsFetcher;
EOL

# Create orsonAI.js
cat > orsonAI.js << EOL
const axios = require('axios');

class OrsonAI {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.model = process.env.MODEL_NAME;
  }

  async generatePersonality() {
    // Add your personality generation logic here
  }
}

module.exports = OrsonAI;
EOL

# Create scriptwriter.js
cat > scriptwriter.js << EOL
const axios = require('axios');

class Scriptwriter {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.model = process.env.MODEL_NAME;
  }

  async createScript(news, orsonPersonality) {
    // Add your script creation logic here
  }
}

module.exports = Scriptwriter;
EOL

cd ..

# Create .env file
cat > .env << EOL
API_URL=http://localhost:11434/api/generate
MODEL_NAME=llama3.1:latest
PORT=3000
NEWS_API_KEY=your_news_api_key_here
EOL

# Create package.json
cat > package.json << EOL
{
  "name": "orson4prez",
  "version": "1.0.0",
  "description": "AI-Powered Political Parody Bot",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "axios": "^0.21.1",
    "dotenv": "^10.0.0",
    "express": "^4.17.1",
    "node-cron": "^3.0.0"
  }
}
EOL

# Create README.md
cat > README.md << EOL
# orson4prez: AI-Powered Political Parody Bot

orson4prez is an innovative NodeJS application that combines AI and web scraping to create a humorous, fictional political character named Orson - a stuffed toy running for "Prez" (president).

## Installation

1. Clone the repository
2. Run \`npm install\`
3. Set up your \`.env\` file
4. Run \`npm start\`

For more details, see the full documentation.
EOL

echo "orson4prez project structure has been set up!"