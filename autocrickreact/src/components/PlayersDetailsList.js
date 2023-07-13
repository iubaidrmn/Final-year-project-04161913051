import React, { Component } from "react";
import { get_team_members, delete_team_member } from "../services/api";
import { FaTrash } from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import "../assets/styles.css";
import "../assets/tableStyling.css";
import Modal from "react-modal";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class PlayersDetailsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_members: [],
      showConfirmation: false,
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      player_id: null,
    };
  }

  handleCandidateClick = (player_id) => {
    this.setState({ player_id: player_id, showConfirmation: true });
  };

  handleConfirmationClose = () => {
    this.setState({ showConfirmation: false });
  };

  async componentDidMount() {
    try {
      const team_members = await get_team_members();
      this.setState({ team_members });
    } catch (error) {}
  }

  handleConfirmationConfirm = () => {
    const { player_id } = this.state;

    delete_team_member(player_id)
      .then((data) => {
        if (data.response === true) {
          this.showSuccessModal(data.message);
          this.setState({ player_id: null });
        } else {
          this.showErrorModal(data.error);
        }
      })
      .catch((error) => {
        this.showErrorModal(error.message);
      });

    this.setState({ showConfirmation: false });
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
        <p>Are you sure you want to Remove Player from the team?</p>
        <div className="popup-actions">
          <button
            className="edit-button"
            onClick={this.handleConfirmationClose}
          >
            Cancel
          </button>
          <button
            className="delete-button"
            onClick={this.handleConfirmationConfirm}
          >
            Confirm
          </button>
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
        onGoToHomepage={() => {
          this.hideSuccessModal();
          window.location.replace("/Players-Details");
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
    const { team_members } = this.state;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="page-container">
              <div className="content-wrap">
                <div className="table-info">
                  <h2 className="table-title">Players Details</h2>
                  <p className="table-description">
                    Showing {team_members.length} Players Details
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "20px",
                    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <table className="table centered smaller">
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>S#</th>
                        <th style={{ textAlign: "center" }}>Player</th>
                        <th style={{ textAlign: "center" }}>Player Type</th>
                        <th style={{ textAlign: "center" }}>Team</th>
                        <th style={{ textAlign: "center" }}>Matches Played</th>
                        <th style={{ textAlign: "center" }}>
                          Remove From Team
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {team_members.map((team_member, index) => {
                        return (
                          <tr key={team_member.player_id}>
                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                            <td style={{ textAlign: "center" }}>
                              {team_member.player_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {team_member.player_type}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {team_member.team_name}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {team_member.total_matches_batsman > 0
                                ? team_member.total_matches_batsman
                                : team_member.total_matches_bowler}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  this.handleCandidateClick(
                                    team_member.player_id
                                  )
                                }
                              >
                                <FaTrash />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {this.renderConfirmationModal()}
                  {this.state.showSuccessModal && this.renderSuccessModal()}
                  {this.state.showErrorModal && this.renderErrorModal()}
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
