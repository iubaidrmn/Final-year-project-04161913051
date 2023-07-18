import React, { Component } from "react";
import {
  get_tournament_details,
  updateTournament,
  tournamentSave1,
} from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";
import Dropzone from "react-dropzone";
import axios from "axios";

export default class Tournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      file_path: "",
      uploadProgress: 0,
      no_of_matches: "",
      latitude: "76.7878",
      longitude: "344.7676",
      venue: "",
      start_date: "",
      end_date: "",
      status: "1",
      created_at: "",
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      _id: this.props._id ?? null,
    };
  }

  async componentDidMount() {
    if (this.state._id !== null) {
      try {
        const tournament = await get_tournament_details(this.state._id);
        this.setState({
          title: tournament[0].title,
          description: tournament[0].description,
          no_of_matches: tournament[0].no_of_matches,
          venue: tournament[0].venue,
          start_date: tournament[0].start_date,
          end_date: tournament[0].end_date,
        });
      } catch (error) {}
    }
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

  handleChange = (event) => {
    if (event.target.name !== "file_path") {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  handleDrop = (acceptedFiles) => {
    this.setState({ file_path: acceptedFiles[0] });
  };

  handleUpload = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const {
      title,
      description,
      no_of_matches,
      latitude,
      longitude,
      venue,
      start_date,
      end_date,
      status,
      file_path,
      _id,
    } = this.state;
    try {
      if (_id !== null) {
        const tournamentDataUpdate = {
          title,
          description,
          no_of_matches,
          venue,
          start_date,
          end_date,
        };
        updateTournament(_id, tournamentDataUpdate)
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
        if (
          file_path !== "" &&
          title !== "" &&
          description !== "" &&
          no_of_matches !== "" &&
          venue !== "" &&
          start_date !== "" &&
          end_date !== ""
        ) {
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          formData.append("no_of_matches", no_of_matches);
          formData.append("latitude", latitude);
          formData.append("longitude", longitude);
          formData.append("venue", venue);
          formData.append("start_date", start_date);
          formData.append("end_date", end_date);
          formData.append("status", status);
          formData.append("file_path", file_path);
          try {
            const response = await tournamentSave1(formData);
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

  renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          window.location.replace("/TournamentList");
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
      title,
      description,
      no_of_matches,
      venue,
      start_date,
      end_date,
      _id,
      file_path,
      uploadProgress,
    } = this.state;
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
                  <h2>{_id == null ? "Create" : "Update"} Tournament</h2>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "475px",
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
                            <label>Description:</label>
                            <input
                              type="text"
                              name="description"
                              value={description}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>No of Matches:</label>
                            <input
                              type="text"
                              name="no_of_matches"
                              value={no_of_matches}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Choose Media:</label>
                            <Dropzone
                              onDrop={this.handleDrop}
                              accept={{
                                "image/*": "image/*",
                                "video/*": "video/*",
                              }}
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
                            <label>Venue:</label>
                            <input
                              type="text"
                              name="venue"
                              value={venue}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>Start Date:</label>
                            <input
                              type="date"
                              name="start_date"
                              value={start_date}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="form-group">
                            <label>End Date:</label>
                            <input
                              type="date"
                              name="end_date"
                              value={end_date}
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
                        {_id == null ? "Create" : "Update"} Tournament
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
