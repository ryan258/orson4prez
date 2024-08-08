import React from 'react';
import './NewsHeadlines.css';

function NewsHeadlines({ news }) {
  // Check if news array is empty
  if (!news || news.length === 0) {
    return <div className="news-headlines empty">No recent news to display.</div>;
  }

  return (
    <section className="news-headlines">
      <h2>Latest News Influencing Orson</h2>
      <ul>
        {/* Iterate over each news item in the news array */}
        {news.map((item, index) => (
          <li key={index}>
            {/* If the news item has a URL, make it a clickable link */}
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            ) : (
              // If there's no URL, just display the title as text
              item.title
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default NewsHeadlines;