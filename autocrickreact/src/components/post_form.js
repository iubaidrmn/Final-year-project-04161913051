import React, { Component } from "react";
import { postSave, get_post_details, updatePost } from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";
import Dropzone from "react-dropzone";
import axios from "axios";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      file_path: "",
      uploadProgress: 0,
      created_at: "",
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      isLoading: true,
      isError: false,
      _id: this.props._id ?? null,
    };
  }

  handleDrop = (acceptedFiles) => {
    this.setState({ file_path: acceptedFiles[0] });
  };

  handleUpload = async () => {
    const { _id, title, description, file_path } = this.state;
    try {
      if (_id !== null) {
        const postDataUpdate = { title, description, file_path };
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
      } else {
        const formData = new FormData();
        formData.append("file_path", file_path);
        formData.append("title", title);
        formData.append("description", description);

        const response = await axios.post(
          "http://localhost:8000/api/postSave",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.setState({ uploadProgress: progress });
            },
          }
        );
        if(response.data.response == true)
          this.showSuccessModal(response.data.message);
        else 
          this.showErrorModal(response.data.error);
      }
    } catch (error) {
      // this.showErrorModal(error.message);
      console.error("Error uploading file:", error);
    }
  };

  async componentDidMount() {
    try {
      if (this.state._id !== null) {
        const post = await get_post_details(this.state._id);
        this.setState({
          title: post[0].title,
          description: post[0].description,
          file_path: post[0].file_path,
        });
      }
    } catch (error) {}
  }

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
          window.location.replace("/PostsList");
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
    if (event.target.name == "title" || event.target.name == "description")
      this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, description, file_path, created_at, _id } = this.state;
    if (_id == null) {
      const postData = { title, description, file_path, created_at };
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
    } else if (_id !== null) {
      const postDataUpdate = { title, description, file_path };
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
    const { title, description, file_path, _id, uploadProgress } = this.state;
    return (
      <div className="news-feed">
        <HeaderBar />
        <div className="content">
          <div className="container">
            <h2>
              {_id == null ? "Create" : "Update"} Post / Educational Content
            </h2>
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
                    <Dropzone
                      onDrop={this.handleDrop}
                      accept="image/*,video/*"
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="dropzone">
                          <input {...getInputProps()} />
                          <div className="form-group">
                            <button type="button">Choose File</button>
                          </div>
                        </div>
                      )}
                    </Dropzone>
                    {file_path && (
                      <div>
                        <p>Selected file: {file_path.name}</p>
                        <div>Upload progress: {uploadProgress}%</div>
                        <button
                          className="submit-button"
                          onClick={this.handleUpload}
                        >
                          {_id == null ? "Create" : "Update"}
                        </button>
                      </div>
                    )}
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
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
