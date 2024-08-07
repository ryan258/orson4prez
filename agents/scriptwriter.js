const axios = require('axios');

class Scriptwriter {
  constructor() {
    this.apiUrl = process.env.API_URL;
    this.model = process.env.MODEL_NAME;
  }

  async createScripts(news, orsonPersonality) {
    const newsHeadlines = news.map(item => item.title).join('. ');

    const platforms = [
      { name: 'Twitter', maxLength: 280 },
      { name: 'Facebook', maxLength: 500 },
      { name: 'Press Release', maxLength: 1000 }
    ];

    const scripts = {};

    for (const platform of platforms) {
      const prompt = `Given the following news: "${newsHeadlines}" and Orson's personality: "${orsonPersonality}", 
      write a ${platform.name} post (max ${platform.maxLength} characters) in Orson's voice commenting on this news. 
      For Twitter, include relevant hashtags. For Facebook, be more conversational. For the Press Release, be more formal but maintain Orson's naivety.
      Remember, Orson is naive and doesn't fully understand politics, but is endearing and well-meaning.`;

      try {
        const response = await axios.post(this.apiUrl, {
          model: this.model,
          prompt: prompt,
          stream: false,
        });
        scripts[platform.name.toLowerCase()] = response.data.response.trim();
      } catch (error) {
        console.error(`Error creating ${platform.name} script:`, error.message);
        scripts[platform.name.toLowerCase()] = `Oopsie! Orson forgot what he was going to say on ${platform.name}!`;
      }
    }

    return scripts;
  }
}

module.exports = Scriptwriter;