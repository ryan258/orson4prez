
// components/Dashboard.js
export function Dashboard({ posts }) {
    return (
      <section className="dashboard">
        <h2>Latest Campaign Updates</h2>
        {Object.entries(posts).map(([platform, post]) => (
          <div key={platform} className="post">
            <h3>{platform}</h3>
            <p>{post}</p>
          </div>
        ))}
      </section>
    );
  }