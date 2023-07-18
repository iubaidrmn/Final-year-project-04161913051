import React, { Component } from "react";
import { get_post_details, updatePost, postSave1 } from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
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

  handleUpload = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const { _id, title, description, file_path } = this.state;
    try {
      const username = localStorage.getItem("username");
      if (_id !== null) {
        const postDataUpdate = { title, description };
        try {
          const response = await updatePost(_id, postDataUpdate);
          if (response.response === true) {
            this.showSuccessModal(response.message);
          } else {
            this.showErrorModal(response.error);
          }
        } catch (error) {
          this.showErrorModal(error.message);
        }
      } else {
        if (file_path !== "" && title !== "" && description !== "") {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("file_path", file_path);
          formData.append("created_by", username);
          try {
            const response = await postSave1(formData);
            if (response.data.response === true) {
              this.showSuccessModal(response.data.message);
            } else {
              this.showErrorModal(response.data.error);
            }
          } catch (error) {
            this.showErrorModal(error.message);
          }
        } else {
          this.showErrorModal("Plese fill/upload all the required fields");
        }
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // this.showErrorModal(error.message);
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
    if (event.target.name === "title" || event.target.name === "description")
      this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { title, description, file_path, _id, uploadProgress } = this.state;
    const fileName = file_path && file_path.name;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="news-feed">
              <div className="content">
                <div className="container">
                  <h2>
                    {_id == null ? "Create" : "Update"} Post / Educational
                    Content
                  </h2>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "500px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <form
                      onSubmit={this.handleUpload}
                      encType="multipart/form-data"
                    >
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
                                    <button
                                      type="button"
                                      className="submit-button"
                                    >
                                      Choose File
                                    </button>
                                  </div>
                                </div>
                              )}
                            </Dropzone>
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
                      {fileName && (
                        <div>
                          <p>Selected file: {fileName}</p>
                          <div>Upload progress: {uploadProgress}%</div>
                        </div>
                      )}
                      <br></br>
                      <button type="submit" className="submit-button">
                        {_id == null ? "Create" : "Update"} Post
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  containerMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
