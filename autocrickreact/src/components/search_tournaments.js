import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { getTournaments, genericSave, getTeams } from "../services/api";
import { FaSearch, FaSave } from "react-icons/fa";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class SearchTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      teams: [],
      tournament_id: null,
      team_id: null,
      searchQuery: "",
      searchResults: [],
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
    };
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
          window.location.replace("/Search-Tournaments");
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
      const teams = await getTeams();
      this.setState({ tournaments, teams });
    } catch (error) {}
  }

  handleSearchChange = async (event) => {
    const searchQuery = event.target.value.toLowerCase();
    let searchResults;

    if (searchQuery.trim() === "") {
      searchResults = await getTournaments();
    } else {
      searchResults = this.state.tournaments.filter((tournament) =>
        tournament.title.toLowerCase().includes(searchQuery)
      );
    }
    this.setState({ searchQuery, tournaments: searchResults });
  };

  handleRequest = async (tournament_id) => {
    const { team_id } = this.state;
    const dataPR = { team_id, tournament_id };
    genericSave(dataPR, "pendingRequestSave")
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

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { tournaments, searchQuery, teams, team_id } = this.state;

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div style={styles.searchContainerStyle}>
              <div className="page-container">
                <div className="content-wrap">
                  <div className="table-info">
                    <h2 className="table-title">Available Tournaments</h2>
                    <p className="table-description">
                      Showing {tournaments.length} tournaments
                    </p>
                    <div style={styles.searchBarStyle}>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={this.handleSearchChange}
                        placeholder="Search tournaments to join"
                        style={styles.searchInputStyle}
                      />
                      <FaSearch />
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "1000px",
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
                          <th>Select Team</th>
                          <th>Participate</th>
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
                                <div className="form-group">
                                  <select
                                    name="team_id"
                                    value={team_id}
                                    onChange={this.handleChange}
                                  >
                                    <option value="">Select Team</option>
                                    {teams.map((team) => (
                                      <option value={team._id} key={team._id}>
                                        {team.title}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>
                              <td>
                                <button
                                  className="edit-button"
                                  onClick={() =>
                                    this.handleRequest(tournament._id)
                                  }
                                >
                                  <FaSave />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
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
  searchContainerStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "16px",
  },
  searchBarStyle: {
    display: "flex",
    alignItems: "center",
    width: "300px",
    padding: "8px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    marginBottom: "5px",
  },
  searchInputStyle: {
    flex: "1",
    border: "none",
    outline: "none",
  },
  searchResultsStyle: {
    marginTop: "16px",
  },
};
