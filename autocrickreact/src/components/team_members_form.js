import React, { Component } from "react";
import { teamMembersSave, getTeams, getUsers } from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import Modal from "react-modal";
import "../assets/styles.css";
import LoadingSpinner from "../components/loading_spinner";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class TeamMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: "",
      players: [],
      teams: [],
      player_id: null,
      showConfirmation: false,
      created_at: "",
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      isLoading: true,
      isError: false,
    };
  }

  async componentDidMount() {
    try {
      const players = await getUsers(3);
      const teams = await getTeams();
      this.setState({ players, teams, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  handleCandidateClick = (candidate) => {
    this.setState({ player_id: candidate._id, showConfirmation: true });
  };

  handleConfirmationClose = () => {
    this.setState({ showConfirmation: false });
  };

  handleConfirmationConfirm = () => {
    const { team_id, player_id } = this.state;
    const teamMembersData = { team_id, player_id };

    teamMembersSave(teamMembersData)
      .then((data) => {
        if (data.response === true) {
          this.showSuccessModal(data.message);
          this.setState({ team_id: "", player_id: null });
        } else {
          this.showErrorModal(data.error);
        }
      })
      .catch((error) => {
        this.showErrorModal(error.message);
      });

    this.setState({ showConfirmation: false });
  };

  handleTeamChange = (e) => {
    this.setState({ team_id: e.target.value });
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

  renderTable() {
    const { players } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player._id}>
              <td>{index + 1}</td>
              <td>{player.fullname}</td>
              <td>
                <button
                  className="submit-button"
                  onClick={() => this.handleCandidateClick(player)}
                >
                  Add to Team
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderConfirmationModal() {
    const { player_id } = this.state;
    return (
      <Modal
        isOpen={this.state.showConfirmation}
        onRequestClose={this.handleConfirmationClose}
        contentLabel="Confirmation Modal"
        className="confirmation-modal"
        overlayClassName="confirmation-modal-overlay"
      >
        <h2>Confirmation</h2>
        <p>
          Are you sure you want to add {player_id && player_id.fullname} to the
          team?
        </p>
        <div className="popup-actions">
          <button onClick={this.handleConfirmationClose}>Cancel</button>
          <button onClick={this.handleConfirmationConfirm}>Confirm</button>
        </div>
      </Modal>
    );
  }

  renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onAddAnother={() => {
          this.hideSuccessModal();
          // Perform additional actions for adding another team member
        }}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          // Redirect to the homepage
          window.location.replace("/NewsFeed");
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
    const { team_id, teams, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="news-feed1">
          <HeaderBar />
          <div className="content1">
            <div className="loading-icon">
              <LoadingSpinner />
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="news-feed1">
              <div className="content1">
                <div>
                  <h2>Choose Team Members</h2>
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
                    <label htmlFor="team">Select a Team:</label>
                    <select
                      id="team"
                      value={team_id}
                      onChange={this.handleTeamChange}
                    >
                      <option value="">-- Select Team --</option>
                      {teams && teams.length > 0 ? (
                        teams.map((team) => (
                          <option value={team._id} key={team._id}>
                            {team.title}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No teams available
                        </option>
                      )}
                    </select>
                    {team_id && this.renderTable()}
                    {this.renderConfirmationModal()}
                    {this.state.showSuccessModal && this.renderSuccessModal()}
                    {this.state.showErrorModal && this.renderErrorModal()}
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
