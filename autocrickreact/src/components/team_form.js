import React, { Component } from "react";
import {
  teamSave,
  getUsers,
  get_team_details,
  updateTeam,
} from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      coach_id: "",
      players: [],
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

  async componentDidMount() {
    try {
      const players = await getUsers(5);
      if (this.state._id !== null) {
        const team = await get_team_details(this.state._id);
        this.setState({ title: team[0].title, coach_id: team[0].coach_id });
      }
      this.setState({ players, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, coach_id, _id } = this.state;
    const teamData = { title, coach_id };
    if (_id == null) {
      teamSave(teamData)
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
      updateTeam(_id, teamData)
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
          window.location.replace("/TeamsList");
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
    const { players, title, coach_id, _id } = this.state;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="news-feed">
              <div className="content">
                <div className="container">
                  <h2>{_id == null ? "Create" : "Update"} Team</h2>
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
                            <label>Select Coach:</label>
                            <select
                              id="coach_id"
                              name="coach_id"
                              value={coach_id}
                              onChange={this.handleChange}
                            >
                              <option value="">Select Coach</option>
                              {players.map((player) => (
                                <option key={player._id} value={player._id}>
                                  {player.fullname}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      {this.state.showSuccessModal && this.renderSuccessModal()}
                      {this.state.showErrorModal && this.renderErrorModal()}
                      <button type="submit" className="submit-button">
                        {_id == null ? "Create" : "Update"} Team
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
