# orson4prez: AI-Powered Political Parody Bot

orson4prez is an innovative NodeJS application that combines AI and web scraping to create a humorous, fictional political character named Orson - a stuffed toy running for "Prez" (president). This project demonstrates the power of AI in content creation and social media automation.

## Features

- Automated news fetching every 6 hours
- AI-generated personality for Orson
- AI-powered script generation based on current news
- RESTful API for manual post generation
- Comprehensive logging for easy debugging and monitoring
- Easily extensible for social media integration

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- Access to a News API (e.g., NewsAPI.org)
- Access to an AI model API (default: local Ollama with llama3.1:latest)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/orson4prez.git
   cd orson4prez
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your environment variables by creating a `.env` file in the root directory:
   ```
   API_URL=http://localhost:11434/api/generate
   MODEL_NAME=llama3.1:latest
   PORT=3000
   NEWS_API_KEY=your_news_api_key_here
   ```
   Replace `your_news_api_key_here` with your actual News API key.

## Usage

To start the orson4prez server:

```
node index.js
```

The server will start, and you'll see a message indicating it's running on `http://localhost:3000` (or your specified PORT).

- The application will automatically fetch news and generate posts every 6 hours.
- To manually generate a post, send a GET request to `/generate-post`.

## Testing

You can test the application using the provided test script or by making a curl request:

1. Using the test script:
   ```
   ./test_orson4prez.sh
   ```

2. Using curl:
   ```
   curl http://localhost:3000/generate-post
   ```

   For prettier output (if you have jq installed):
   ```
   curl http://localhost:3000/generate-post | jq
   ```

3. On Windows PowerShell:
   ```
   Invoke-RestMethod -Uri http://localhost:3000/generate-post -Method Get
   ```

After running a test, check the `orson4prez.log` file for detailed logging information.

## Project Structure

```
orson4prez/
│
├── index.js                 # Main application file
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
├── README.md                # Project documentation
├── orson4prez.log           # Application log file
├── test_orson4prez.sh       # Test script
│
└── agents/
    ├── newsFetcher.js       # Agent for fetching latest news
    ├── orsonAI.js           # Agent for generating Orson's personality
    └── scriptwriter.js      # Agent for creating Orson's social media posts
```

## Extending the Project

To extend this project, consider:

1. Integrating with social media APIs to automate posting.
2. Adding a database to store generated content and avoid repetition.
3. Creating a web interface for monitoring and managing the system.
4. Implementing more sophisticated AI models or fine-tuning existing ones for better results.

## Logging

The application uses Winston for logging. Logs are written to both the console and the `orson4prez.log` file. You can adjust the log level and format in the main `index.js` file.

## Contributing

Contributions to orson4prez are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to NewsAPI.org for providing access to current news data.
- This project uses Ollama for local AI model hosting.

## Contact

If you have any questions or feedback, please open an issue on this GitHub repository.

Happy coding, and may Orson's political campaign be as hilarious as it is enlightening!