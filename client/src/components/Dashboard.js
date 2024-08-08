import React from 'react';
import './Dashboard.css';

function Dashboard({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="dashboard empty">No posts available at the moment.</div>;
  }

  return (
    <section className="dashboard">
      <h2>Latest Campaign Updates</h2>
      {posts.map((post, index) => (
        <div key={index} className="news-post">
          <h3 className="news-title">{post.news.title}</h3>
          <div className="posts-container">
            {Object.entries(post.scripts).map(([platform, content]) => (
              <div key={platform} className="post">
                <h4>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                <p>{content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Dashboard;