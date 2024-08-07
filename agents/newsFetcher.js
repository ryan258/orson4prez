const axios = require('axios');

class NewsFetcher {
  constructor() {
    // Store the API key from environment variables
    this.apiKey = process.env.NEWS_API_KEY;
    // Base URL for the news API
    this.apiUrl = 'https://newsapi.org/v2/top-headlines';
  }

  async fetchLatestNews() {
    try {
      // Make a GET request to the news API
      const response = await axios.get(this.apiUrl, {
        params: {
          country: 'us', // Fetch news from the United States
          category: 'politics', // Focus on political news
          apiKey: this.apiKey, // Include the API key for authentication
        },
      });

      // Extract and return relevant information from each article
      return response.data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
      }));
    } catch (error) {
      // Log any errors that occur during the API request
      console.error('Error fetching news:', error.message);
      // Return an empty array if there's an error
      return [];
    }
  }
}

module.exports = NewsFetcher;