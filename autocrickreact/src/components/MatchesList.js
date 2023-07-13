import React, { Component } from "react";
import {
  getMatches,
  getTournamentNameofMatch,
  delete_info,
} from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import Match from "../components/match_form";
import "../assets/styles.css";
import "../assets/tableStyling.css";
import Modal from "react-modal";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class MatchesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      tournamentNames: {},
      redirectToMatch: false,
      matchId: null,
      showConfirmation: false,
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      _id: null,
    };
  }

  handleCandidateClick = (_id) => {
    this.setState({ _id, showConfirmation: true });
  };

  handleConfirmationClose = () => {
    this.setState({ showConfirmation: false });
  };

  handleConfirmationConfirm = () => {
    const { _id } = this.state;

    delete_info(_id, "delete_match")
      .then((data) => {
        if (data.response === true) {
          this.showSuccessModal(data.message);
          this.setState({ _id: null });
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
        <p>Are you sure you want to Delete the record?</p>
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
          window.location.replace("/MatchesList");
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

  async componentDidMount() {
    try {
      const matches = await getMatches();
      this.setState({ matches }, () => {
        this.getTournamentNames();
      });
    } catch (error) {
      console.error("Error loading matches:", error);
    }
  }

  getTournamentNames = async () => {
    const { matches } = this.state;
    const tournamentIds = matches.map((match) => match.tournament_id);
    const tournamentNames = {};
    try {
      const promises = tournamentIds.map((tournamentId) =>
        getTournamentNameofMatch(tournamentId)
      );
      const responses = await Promise.all(promises);
      responses.forEach((response, index) => {
        const tournamentId = tournamentIds[index];
        const tournamentName = response[0].title;
        tournamentNames[tournamentId] = tournamentName;
      });

      this.setState({ tournamentNames });
    } catch (error) {
      console.error("Error loading Tournament names:", error);
    }
  };

  handleEdit = (row) => {
    this.setState({
      redirectToMatch: true,
      matchId: row._id,
    });
  };

  handleDelete = (row) => {};

  render() {
    const { matches, redirectToMatch, matchId, tournamentNames } = this.state;
    if (redirectToMatch) {
      return <Match _id={matchId} />;
    }
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="page-container">
              <div className="content-wrap">
                <div className="table-info">
                  <h2 className="table-title">Available Matches</h2>
                  <p className="table-description">
                    Showing {matches.length} matches
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
                    maxWidth: "500px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <table className="table centered smaller">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Match</th>
                        <th>Description</th>
                        <th>Tournament</th>
                        <th>Start Date</th>
                        <th>Start Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matches.map((match, index) => {
                        const tournamentName =
                          tournamentNames[match.tournament_id] || "";
                        return (
                          <tr key={match._id}>
                            <td>{index + 1}</td>
                            <td>{match.title}</td>
                            <td>{match.description}</td>
                            <td>{tournamentName}</td>
                            <td>{match.start_date}</td>
                            <td>{match.start_time}</td>
                            <td>
                              <button
                                className="edit-button"
                                onClick={() => this.handleEdit(match)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  this.handleCandidateClick(match._id)
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
