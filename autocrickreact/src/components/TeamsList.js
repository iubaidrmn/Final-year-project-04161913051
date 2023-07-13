import React, { Component } from "react";
import { getTeams, getCoachNameOfTeam, delete_info } from "../services/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import Team from "../components/team_form";
import "../assets/styles.css";
import "../assets/tableStyling.css";
import Modal from "react-modal";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      coachNames: {},
      redirectToTeam: false,
      teamId: null,
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

    delete_info(_id, "delete_team")
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

  async componentDidMount() {
    try {
      const teams = await getTeams();
      this.setState({ teams }, () => {
        this.getCoachNames();
      });
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  }

  getCoachNames = async () => {
    const { teams } = this.state;
    const coachIds = teams.map((team) => team.coach_id);
    const coachNames = {};

    try {
      const promises = coachIds.map((coachId) => getCoachNameOfTeam(coachId));
      const responses = await Promise.all(promises);

      responses.forEach((response, index) => {
        const coachId = coachIds[index];
        const coachName = response[0].fullname;
        coachNames[coachId] = coachName;
      });

      this.setState({ coachNames });
    } catch (error) {
      console.error("Error loading coach names:", error);
    }
  };

  handleEdit = (row) => {
    this.setState({
      redirectToTeam: true,
      teamId: row._id,
    });
  };

  render() {
    const { teams, coachNames, redirectToTeam, teamId } = this.state;
    if (redirectToTeam) {
      return <Team _id={teamId} />;
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
                  <h2 className="table-title">Available Teams</h2>
                  <p className="table-description">
                    Showing {teams.length} teams
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
                        <th>Team</th>
                        <th>Coach Name</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teams.map((team, index) => {
                        const coachName = coachNames[team.coach_id] || "";
                        return (
                          <tr key={team._id}>
                            <td>{index + 1}</td>
                            <td>{team.title}</td>
                            <td>{coachName}</td>
                            <td>
                              <button
                                className="edit-button"
                                onClick={() => this.handleEdit(team)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="delete-button"
                                onClick={() =>
                                  this.handleCandidateClick(team._id)
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
