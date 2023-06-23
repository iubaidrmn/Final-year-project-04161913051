import React, { Component } from 'react';
import { getPosts } from '../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import Post from '../components/post_form';
import '../assets/styles.css';
import '../assets/tableStyling.css';

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      redirectToPost: false,
      postId: null,
    };
  }

  async componentDidMount() {
    try {
      const posts = await getPosts();
      this.setState({ posts });
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  handleEdit = (row) => {
    this.setState({
      redirectToPost: true,
      postId: row._id,
    });
  };

  handleDelete = (row) => {
  };

  render() {
    const { posts, redirectToPost, postId } = this.state;
    if (redirectToPost) {
      return <Post _id={postId} />;
    }
    return (
      <div className="page-container">
        <HeaderBar />
        <div className="content-wrap">
          <div className="table-info">
            <h2 className="table-title">Available Posts</h2>
            <p className="table-description">Showing {posts.length} posts</p>
          </div>
          <table className="table centered smaller">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => {
                return (
                  <tr key={post._id}>
                    <td>{index + 1}</td>
                    <td>{post.title}</td>
                    <td>{post.title}</td>
                    <td>
                      <button className="edit-button" onClick={() => this.handleEdit(post)}>
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => this.handleDelete(post)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}