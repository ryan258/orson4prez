const axios = require('axios');

class Scriptwriter {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.model = process.env.MODEL_NAME;
  }

  async createScripts(news, orsonPersonality) {
    const scripts = [];

    for (const newsItem of news) {
      const newsScripts = {
        twitter: [],
        facebook: [],
        pressRelease: []
      };

      // Generate 3 Twitter drafts
      for (let i = 0; i < 3; i++) {
        newsScripts.twitter.push(await this.generateScript(newsItem, 'Twitter', orsonPersonality));
      }

      // Generate 3 Facebook drafts
      for (let i = 0; i < 3; i++) {
        newsScripts.facebook.push(await this.generateScript(newsItem, 'Facebook', orsonPersonality));
      }

      // Generate 2 Press Release drafts
      for (let i = 0; i < 2; i++) {
        newsScripts.pressRelease.push(await this.generateScript(newsItem, 'Press Release', orsonPersonality));
      }

      scripts.push({
        news: newsItem,
        scripts: newsScripts
      });
    }

    return scripts;
  }

  async generateScript(newsItem, platform, orsonPersonality) {
    const prompt = this.generatePrompt(newsItem, platform, orsonPersonality);
    try {
      const response = await axios.post(this.apiUrl, {
        model: this.model,
        prompt: prompt,
        stream: false,
      });
      return response.data.response.trim();
    } catch (error) {
      console.error(`Error creating ${platform} script:`, error.message);
      return `Oopsie! Orson forgot what he was going to say about this news on ${platform}!`;
    }
  }

  generatePrompt(newsItem, platform, orsonPersonality) {
    const maxLengths = {
      Twitter: 280,
      Facebook: 500,
      'Press Release': 1000
    };

    return `Given the following news: "${newsItem.title}" and Orson's personality: "${orsonPersonality}", 
    write a ${platform} post (max ${maxLengths[platform]} characters) in Orson's voice commenting specifically on this news item. 
    For Twitter, include relevant hashtags. For Facebook, be more conversational. For the Press Release, be more formal but maintain Orson's naivety.
    Remember, Orson is naive and doesn't fully understand politics, but is endearing and well-meaning.`;
  }
}

module.exports = Scriptwriter;