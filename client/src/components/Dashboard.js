import React from 'react';
import './Dashboard.css';

function Dashboard({ posts }) {
  // Check if posts object is empty
  if (!posts || Object.keys(posts).length === 0) {
    return <div className="dashboard empty">No posts available at the moment.</div>;
  }

  return (
    <section className="dashboard">
      <h2>Latest Campaign Updates</h2>
      <div className="posts-container">
        {/* Iterate over each post in the posts object */}
        {Object.entries(posts).map(([platform, post]) => (
          <div key={platform} className="post">
            {/* Capitalize the first letter of the platform name */}
            <h3>{platform.charAt(0).toUpperCase() + platform.slice(1)}</h3>
            <p>{post}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Dashboard;