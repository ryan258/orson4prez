// components/NewsHeadlines.js
export function NewsHeadlines({ news }) {
    return (
      <section className="news-headlines">
        <h2>Latest News Influencing Orson</h2>
        <ul>
          {news.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </section>
    );
  }