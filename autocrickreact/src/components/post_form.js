import React, { Component } from 'react';
import { postSave } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description : '',
            file_path : 'image/',
            created_at: '',
            error: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { title, description, file_path, created_at } = this.state;
        const postData = {title, description, file_path, created_at };
    
        postSave(postData)
          .then((data) => {
            if (data.response === true) {
              this.setState({ error: data.message });
              window.location.replace("/NewsFeed")
            } else {
              this.setState({ error: data.error });
            }
          })
          .catch((error) => {
            this.setState({ error: error.message });
          });
    };

    render() {
        const { title, description, file_path, error } = this.state;
        return (
          <div className="news-feed">
            <HeaderBar />
            <div className="content">
              <div className='container'>
              <h2>Create Post / Educational Content</h2>
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="col">
                        <div className="form-group">
                          <label>Title:</label>
                          <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Description:</label>
                          <input
                            type="text"
                            name="description"
                            value={description}
                            onChange={this.handleChange}
                          />
                        </div>
                    </div>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="submit-button">
                    Create Post
                  </button>
                </form>
              </div>
            </div>
            <Footer />
        </div>
        );
    }
}  