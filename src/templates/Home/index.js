import { Component } from 'react';
import './styles.css';
import { Posts } from '../../components/Posts/index';
import { loadPosts } from '../../services/loadPosts';
import Button from '../../components/Button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 25,
    searchPost: '',
  };

  async componentDidMount() {
    await this.loadPost();
  }

  handleChange = (event) => {
  const { value } = event.target;
    this.setState({
      searchPost: value,
    });
  }

  loadPost = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    });
  }

  loadMorePosts =  () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchPost } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchPost ? posts.filter((post) => {
      return post.title.toLowerCase().includes(searchPost.toLowerCase());
    }) : posts;

    return (
      <section className="container">
        <label htmlFor="search">
        <p>Buscando por {searchPost}</p>
        <br />
          <input
            type="search"
            onChange={this.handleChange}
            value={searchPost}
          />
          <br />
          <br />
        </label>
        <Posts posts={filteredPosts} />

        <div className="button-container">
        {!searchPost && (
          <Button
            onClick={this.loadMorePosts}
            text={'Load More Posts'}
            disabled={noMorePosts}
          />
        )}
        </div>
      </section>
    );
  }
}

export default Home;
