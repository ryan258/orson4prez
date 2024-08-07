const axios = require('axios');

class OrsonAI {
  constructor() {
    // Store the API URL and model name from environment variables
    this.apiUrl = process.env.API_URL;
    this.model = process.env.MODEL_NAME;
  }

  async generatePersonality() {
    // Define the prompt for generating Orson's personality
    const prompt = `Generate a brief description of Orson, a stuffed toy who is running for "Prez" (president). 
    Orson should have a ludicrously naive but endearing naivete about politics and the world. 
    Include some key personality traits and catchphrases.`;

    try {
      // Make a POST request to the AI model API
      const response = await axios.post(this.apiUrl, {
        model: this.model,
        prompt: prompt,
        stream: false, // We don't need streaming for this request
      });

      // Return the generated personality description
      return response.data.response;
    } catch (error) {
      // Log any errors that occur during the API request
      console.error('Error generating Orson\'s personality:', error.message);
      // Return a default personality if there's an error
      return 'Orson, the lovable and naive Prez candidate';
    }
  }
}

module.exports = OrsonAI;