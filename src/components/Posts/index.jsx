import { PostCard } from '../PostCard';

export const Posts = ({ posts }) => (
  <div className="posts">
    {posts.map((post) => (<PostCard key={post.id} posts={post} />))}
  </div>
);
