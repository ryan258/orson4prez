# orson4prez: AI-Powered Political Parody Bot with Web Interface

orson4prez is an innovative full-stack application that combines AI, web scraping, and a React frontend to create a humorous, fictional political campaign for Orson - a stuffed toy running for "Prez" (president). This project demonstrates the power of AI in content creation, multi-platform social media automation, and interactive web experiences.

## Features

- Automated news fetching every 6 hours
- AI-generated personality for Orson
- AI-powered script generation based on current news
- Multi-platform content creation (Twitter, Facebook, and Press Releases)
- RESTful API for post generation and retrieval
- React-based web interface for user interaction
- Simple logging of generated content

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

2. Install backend dependencies:
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

4. Install frontend dependencies:
   ```
   cd client
   npm install
   ```

## Usage

To start the development server:

1. In the root directory, start the backend:
   ```
   npm run server
   ```

2. In a new terminal, navigate to the client directory and start the frontend:
   ```
   cd client
   npm start
   ```

The backend will run on `http://localhost:3000`, and the frontend will be available at `http://localhost:3000`.

For production:

1. Build the React app:
   ```
   cd client
   npm run build
   ```

2. Start the production server from the root directory:
   ```
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Project Structure

```
orson4prez/
│
├── index.js                 # Main server file
├── .env                     # Environment variables
├── package.json             # Backend dependencies and scripts
├── README.md                # Project documentation
├── orson4prez.log           # Log file for generated content
│
├── agents/
│   ├── newsFetcher.js       # Agent for fetching latest news
│   ├── orsonAI.js           # Agent for generating Orson's personality
│   └── scriptwriter.js      # Agent for creating multi-platform posts
│
└── client/                  # Frontend React application
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
    ├── package.json         # Frontend dependencies and scripts
    └── README.md            # Frontend-specific documentation
```

## API Endpoints

- GET `/api/latest-posts`: Retrieve the latest generated posts and news
- POST `/api/generate-posts`: Trigger the generation of new posts

## Logging

The application logs all generated posts to `orson4prez.log`. Each log entry includes a timestamp and the full content for each platform (Twitter, Facebook, and Press Release).

## Extending the Project

To extend this project, consider:

1. Implementing actual social media API integrations to automate posting.
2. Adding a database to store generated content and avoid repetition.
3. Enhancing the web interface with more interactive features.
4. Implementing more sophisticated AI models or fine-tuning existing ones for better results.
5. Adding more social media platforms or content types.
6. Implementing user authentication for admin features.

## Contributing

Contributions to orson4prez are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to NewsAPI.org for providing access to current news data.
- This project uses Ollama for local AI model hosting.
- Frontend built with React.

## Contact

If you have any questions or feedback, please open an issue on this GitHub repository.

Happy coding, and may Orson's multi-platform political campaign be as hilarious as it is enlightening!