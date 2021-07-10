import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos")
    const [posts, photos ] = await Promise.all([postsResponse, photosResponse]);
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url }
    })
    this.setState({ posts: postsAndPhotos });
  };

  // componentDidUpdate() {
  // }

  // componentWillUnmount() {
  // }

  render() {
    const { posts, cover } = this.state;
    return (
      <section className="container">
        <div className="posts">
          {/* todo array em JS já tem um map disponível que retorna um novo array com as coisas que a gente pedir e para que eu possa retornar mais de um elemento é só colocar () na frente da arrow function, desde que exista um elemento root(pai), pode ser <> </> ou uma div. Todo map exige um key(algo único de cada elemento) no primeiro elemento */}
          {posts.map((post) => (
            <div className="post">
              <div key={post.id} className="post-content">
                <h1>{post.title}</h1>
                <img className="post-image" src={post.cover} alt={post.title} />
                <p>{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}

export default App;
