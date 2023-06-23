import React, { Component } from 'react';
import { postSave, get_post_details, updatePost } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import SuccessMessage from '../includes/success';
import ErrorMessage from '../includes/error';

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description : '',
            file_path : '',
            created_at: '',
            showSuccessModal: false,
            showErrorModal: false,
            successMessage: '',
            errorMessage: '',
            isLoading: true,
            isError: false,
            _id: this.props._id ?? null
        }
    }

    async componentDidMount() {
      try {
        if(this.state._id !== null){
          const post = await get_post_details(this.state._id);
          this.setState({ title:post[0].title, description:post[0].description });
        }
      } catch (error) {
      }
    }

    handleFileChange = (event) => {
      this.setState({ file_path: event.target.files[0] });
    };

    showSuccessModal = (message) => {
      this.setState({ successMessage: message, showSuccessModal: true });
    };
  
    hideSuccessModal = () => {
      this.setState({ showSuccessModal: false });
    };
  
    showErrorModal = (message) => {
      this.setState({ errorMessage: message, showErrorModal: true });
    };
  
    hideErrorModal = () => {
      this.setState({ showErrorModal: false });
    };

    renderSuccessModal() {
      const { successMessage } = this.state;
      return (
        <SuccessMessage
          message={successMessage}
          onClose={this.hideSuccessModal}
          onGoToHomepage={() => {
            this.hideSuccessModal();
            // Redirect to the homepage
            window.location.replace('/PostsList');
          }}
        />
      );
    }
  
    renderErrorModal() {
      const { errorMessage } = this.state;
      return (
        <ErrorMessage message={errorMessage} onClose={this.hideErrorModal} />
      );
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
      
        const { title, description, file_path, created_at, _id } = this.state;
        if(_id == null){
          const postData = {title, description, file_path, created_at };
          postSave(postData)
            .then((data) => {
              if (data.response === true) {
                this.showSuccessModal(data.message);
              } else {
                this.showErrorModal(data.error);
              }
            })
            .catch((error) => {
              this.showErrorModal(error.message);
            });
        } else if(_id !== null){
          const postDataUpdate = {title, description, file_path };
          updatePost(_id, postDataUpdate)
          .then((data) => {
            if (data.response === true) {
              this.showSuccessModal(data.message);
            } else {
              this.showErrorModal(data.error);
            }
          })
          .catch((error) => {
            this.showErrorModal(error.message);
          });
        }
    };

    render() {
        const { title, description, file_path, _id } = this.state;
        return (
          <div className="news-feed">
            <HeaderBar />
            <div className="content">
              <div className='container'>
              <h2>{_id == null ? 'Create' : 'Update'}  Post / Educational Content</h2>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
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
                        <div className="form-group">
                          <label>Choose Media:</label>
                          <input
                            type="file"
                            name="file_path"
                            onChange={this.handleFileChange}
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
                  {this.state.showSuccessModal && this.renderSuccessModal()}
                  {this.state.showErrorModal && this.renderErrorModal()}
                  <button type="submit" className="submit-button">
                  {_id == null ? 'Create' : 'Update'}
                  </button>
                </form>
              </div>
            </div>
            <Footer />
        </div>
        );
    }
}  