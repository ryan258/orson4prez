const axios = require('axios');

class Scriptwriter {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.model = process.env.MODEL_NAME;
  }

  async createScripts(news, orsonPersonality) {
    const scripts = [];

    for (const newsItem of news) {
      const platforms = ['Twitter', 'Facebook', 'Press Release'];
      const newsScripts = {};

      for (const platform of platforms) {
        const prompt = this.generatePrompt(newsItem, platform, orsonPersonality);
        try {
          const response = await axios.post(this.apiUrl, {
            model: this.model,
            prompt: prompt,
            stream: false,
          });
          newsScripts[platform.toLowerCase()] = response.data.response.trim();
        } catch (error) {
          console.error(`Error creating ${platform} script:`, error.message);
          newsScripts[platform.toLowerCase()] = `Oopsie! Orson forgot what he was going to say about this news on ${platform}!`;
        }
      }

      scripts.push({
        news: newsItem,
        scripts: newsScripts
      });
    }

    return scripts;
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