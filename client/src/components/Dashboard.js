import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './Dashboard.css';

function Dashboard({ posts }) {
  if (!posts || posts.length === 0) {
    return <div className="dashboard empty">No posts available at the moment.</div>;
  }

  const markdownToHtml = (markdown) => {
    const rawHtml = marked(markdown);
    return DOMPurify.sanitize(rawHtml);
  };

  return (
    <section className="dashboard">
      <h2>Latest Campaign Updates</h2>
      {posts.map((post, index) => (
        <div key={index} className="news-post">
          <h3 className="news-title">{post.news.title}</h3>
          <div className="platform-container">
            <div className="platform-section">
              <h4>Twitter Drafts</h4>
              {post.scripts.twitter.map((tweet, i) => (
                <div key={i} className="post">
                  <h5>Draft {i + 1}</h5>
                  <div 
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(tweet) }}
                  />
                </div>
              ))}
            </div>
            <div className="platform-section">
              <h4>Facebook Drafts</h4>
              {post.scripts.facebook.map((fbPost, i) => (
                <div key={i} className="post">
                  <h5>Draft {i + 1}</h5>
                  <div 
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(fbPost) }}
                  />
                </div>
              ))}
            </div>
            <div className="platform-section">
              <h4>Press Release Drafts</h4>
              {post.scripts.pressRelease.map((release, i) => (
                <div key={i} className="post">
                  <h5>Draft {i + 1}</h5>
                  <div 
                    className="post-content"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(release) }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Dashboard;