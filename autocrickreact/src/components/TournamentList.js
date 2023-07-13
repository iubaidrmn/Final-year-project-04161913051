import React, { Component } from "react";
import { getTournaments, delete_info } from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import Tournament from "../components/tournament_form";
import "../assets/styles.css";
import "../assets/tableStyling.css";
import Modal from "react-modal";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      redirectToTournament: false,
      tournamentId: null,
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

    delete_info(_id, "delete_tournament")
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
    const { _id } = this.state;
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

  async componentDidMount() {
    try {
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  }

  handleEdit = (row) => {
    this.setState({
      redirectToTournament: true,
      tournamentId: row._id,
    });
  };

  render() {
    const { tournaments, redirectToTournament, tournamentId } = this.state;
    if (redirectToTournament) {
      return <Tournament _id={tournamentId} />;
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
                  <h2 className="table-title">Available Tournaments</h2>
                  <p className="table-description">
                    Showing {tournaments.length} tournaments
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
                        <th>ID</th>
                        <th>Tournament</th>
                        <th>Description</th>
                        <th>Venue/Location</th>
                        <th>No of Matches</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournaments.map((tournament, index) => {
                        return (
                          <tr key={tournament._id}>
                            <td>{index + 1}</td>
                            <td>{tournament.title}</td>
                            <td>{tournament.description}</td>
                            <td>{tournament.venue}</td>
                            <td>{tournament.no_of_matches}</td>
                            <td>{tournament.start_date}</td>
                            <td>{tournament.end_date}</td>
                            <td>
                              <button
                                className="edit-button"
                                onClick={() => this.handleEdit(tournament)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  this.handleCandidateClick(tournament._id)
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
