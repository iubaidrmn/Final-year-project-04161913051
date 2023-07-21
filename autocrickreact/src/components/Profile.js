import React, { Component } from "react";
import { FaUpload, FaUser } from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { Link } from "react-router-dom";
import { get_user_details, updateUser, genericSavePicture, getByIDGeneric, } from "../services/api";
import "../assets/styles.css";
import "../assets/tableStyling.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";
import Dropzone from "react-dropzone";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      email: "",
      player_type: "",
      file_path: "",
      coverPhoto: "",
      profilePicture: "",
      password: "",
      contact_no: "",
      created_at: "",
      role_id: localStorage.getItem("role_id"),
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      roles: [],
      isError: false,
      isLoading: true,
    };
  }

  handleDrop = (acceptedFiles) => {
    this.setState({ file_path: acceptedFiles[0] });
  };
  handleCoverDrop = (acceptedFiles) => {
    this.setState({ coverPhoto: acceptedFiles[0] });
  };

  handleUpload = async (event) => {
    event.preventDefault();
    const { file_path, coverPhoto } = this.state;
    try {
      const username = localStorage.getItem("username");
      let data = {};
      if (file_path !== "") {
        data = { username, file_path };
      } else if (coverPhoto !== "") {
        data = { username, coverPhoto };
      } else {
        this.showErrorModal("Upload Picture!");
      }
      try {
        const response = await genericSavePicture(data, "userProfileSave");
        if (response.data.response === true) {
          this.showSuccessModal(response.data.message);
        } else {
          this.showErrorModal(response.data.error);
        }
      } catch (error) {
        this.showErrorModal(error.message);
      }
    } catch (error) {
      this.showErrorModal(error.message);
    }
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

  async componentDidMount() {
    try {
      const userDetails = await get_user_details(
        localStorage.getItem("username")
      );
      let profilePicture = await getByIDGeneric(
        localStorage.getItem("username"),
        "get_profile_picture",
        "username"
      );
      this.setState({
        fullname: userDetails[0].fullname,
        username: userDetails[0].username,
        contact_no: userDetails[0].contact_no,
        email: userDetails[0].email,
        password: userDetails[0].password,
      });
      if (
        profilePicture.profile_picture.file_path !== null &&
        profilePicture.profile_picture.coverPhoto !== null
      ) {
        this.setState({
          profilePicture: profilePicture.profile_picture.file_path.substring(
            profilePicture.profile_picture.file_path.lastIndexOf("posts/")
          ),
          coverPhoto: profilePicture.profile_picture.coverPhoto.substring(
            profilePicture.profile_picture.coverPhoto.lastIndexOf("posts/")
          ),
        });
      } else if (profilePicture.profile_picture.file_path !== null) {
        this.setState({
          profilePicture: profilePicture.profile_picture.file_path.substring(
            profilePicture.profile_picture.file_path.lastIndexOf("posts/")
          ),
        });
      } else if (profilePicture.profile_picture.coverPhoto !== null) {
        this.setState({
          coverPhoto: profilePicture.profile_picture.coverPhoto.substring(
            profilePicture.profile_picture.coverPhoto.lastIndexOf("posts/")
          ),
        });
      }
	  if (this.state.role_id == '3'){
		  this.setState({ player_type:userDetails[0].player_type })
	  }
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { fullname, username, email, password, contact_no, player_type } = this.state;
    const userData = { fullname, username, email, password, contact_no, player_type };

    const userId = localStorage.getItem("username");

    updateUser(userId, userData)
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
  };
  renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          window.location.replace("/User-Profile");
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

  render() {
    const {
      fullname,
      username,
      email,
      password,
      contact_no,
      profilePicture,
      coverPhoto,
	  player_type,
	  role_id,
    } = this.state;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            {role_id == '3' && (<div style={{ marginTop: "10px" }}>
			    <Link to="/Player-Statistics" style={styles.uploadButton}>Statistics</Link>
            </div>)}
            <div className="content" style={styles.scrollContainer}>
              <div className="container">
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "20px",
                    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "600px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
					{coverPhoto !== "" ?
                        <img src={coverPhoto} alt="Cover" style={{ width: "100%", height: "auto", borderRadius: "10px", }}/>
						:
						<img src={`posts/cover.jpg`} alt="Cover" style={{ width: "100%", height: "auto", borderRadius: "10px", }}/>
					}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "120px",
                          height: "120px",
                          borderRadius: "50%",
                          border: "5px solid #FFFFFF",
                          overflow: "hidden",
                        }}
                      >
					  {profilePicture !== "" ?
                        <img src={profilePicture} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", }} />
						:
						<FaUser style={{ width: "100%", height: "100%", objectFit: "cover", }} />
					  }
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <form encType="multipart/form-data">
                          <div style={{ display: "flex" }}>
                            <Dropzone
                              onDrop={this.handleDrop}
                              accept="image/*"
                              multiple={false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <button
                                    type="button"
                                    style={styles.uploadButton}
                                  >
                                    Update Profile Photo
                                  </button>
                                </div>
                              )}
                            </Dropzone>
                            <button
                              onClick={this.handleUpload}
                              style={styles.uploadButton}
                            >
                              <FaUpload style={{ cursor: "pointer" }} />
                            </button>
                          </div>
                        </form>
                      </div>
                      <div style={{ marginTop: "10px" }}>
                        <form encType="multipart/form-data">
                          <div style={{ display: "flex" }}>
                            <Dropzone
                              onDrop={this.handleCoverDrop}
                              accept="image/*"
                              multiple={false}
                            >
                              {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <button
                                    type="button"
                                    style={styles.uploadButton}
                                  >
                                    Update Cover Photo
                                  </button>
                                </div>
                              )}
                            </Dropzone>
                            <button
                              onClick={this.handleUpload}
                              style={styles.uploadButton}
                            >
                              <FaUpload style={{ cursor: "pointer" }} />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label>Fullname:</label>
                          <input
                            type="text"
                            name="fullname"
                            value={fullname}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Email:</label>
                          <input
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Contact No:</label>
                          <input
                            type="text"
                            name="contact_no"
                            value={contact_no}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Username:</label>
                          <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Password:</label>
                          <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                          />
                        </div>
						{role_id === '3' && (<div className="form-group">
							<label>Player Type:</label>
							<select
							  name="player_type"
							  value={player_type}
							  onChange={this.handleChange}
							>
							  <option value="">Select Player Type</option>
							  <option value="all-rounder">All Rounder</option>
							  <option value="batsman">Batsman</option>
							  <option value="bowler">Bowler</option>
							</select>
						</div>)}
                      </div>
                    </div>
                    {this.state.showSuccessModal && this.renderSuccessModal()}
                    {this.state.showErrorModal && this.renderErrorModal()}
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#4caf50",
                        color: "#ffffff",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                      }}
                    >
                      Update Profile
                    </button>
                  </form>
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

  scrollContainer: {
    flex: 1,
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
    width: "100%",
    height: "calc(100vh - 400px)", // Adjust the height as needed
    maxWidth: "600px", // Adjust the width as needed
    margin: "0 auto", // Center the container horizontally
  },
  uploadButton: {
    backgroundColor: "#FFFFFF",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#333333",
    borderRadius: "5px",
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.15)",
    outline: "none",
    marginRight: "10px",
    marginLeft: "10px",
	textDecoration: "none",
  },
  centeredButton: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    marginBottom: "10px",
  },
};
