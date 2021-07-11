export const PostCard = ({ posts }) => (
  <div className="post">
    <img className="post-image" src={posts.cover} alt={posts.title} />
    <div className="post-content">
      <h1>{posts.title}</h1>
      <p>{posts.body}</p>
    </div>
  </div>
);
