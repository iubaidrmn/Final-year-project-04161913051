import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";

const dialogStyle = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "16px",
  borderRadius: "4px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  width: "400px",
};

export default class SearchTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      teams: ["Team A", "Team B", "Team C", "Team D"],
      searchResults: [],
      showPendingRequests: false,
      pendingRequests: [
        { team: "Team A", status: "pending" },
        { team: "Team B", status: "rejected" },
        { team: "Team C", status: "accepted" },
      ],
      showYourTeams: false,
      myTeams: [],
      showDialog: false,
      dialogData: {
        teamName: "",
        status: "pending",
        bowlerOrBatsman: "", // Added field for the option menu
      },
      options: ["Bowler", "Batsman"], // Available options for the menu
    };
  }

  componentDidMount() {
    this.updateMyTeams();
  }

  updateMyTeams = () => {
    const myTeams = this.state.pendingRequests
      .filter((request) => request.status === "accepted")
      .map((request) => request.team);

    this.setState({ myTeams });
  };

  handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    const searchResults = this.state.teams.filter((team) =>
      team.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ searchQuery, searchResults });
  };

  joinTeam = (teamName) => {
    if (this.state.myTeams.includes(teamName)) {
      return; // Team is already joined, do nothing
    }

    this.setState({
      showDialog: true,
      dialogData: {
        teamName: teamName,
        status: "pending",
        bowlerOrBatsman: "", // Reset the field when joining a new team
      },
    });
  };

  cancelRequest = (teamName) => {
    this.setState((prevState) => ({
      pendingRequests: prevState.pendingRequests.map((request) => {
        if (request.team === teamName && request.status === "pending") {
          return {
            ...request,
            status: "cancelled",
          };
        }
        return request;
      }),
    }));

    setTimeout(() => {
      this.setState((prevState) => ({
        pendingRequests: prevState.pendingRequests.filter(
          (request) =>
            !(request.team === teamName && request.status === "cancelled")
        ),
      }));
    }, 1000);
  };

  handleDialogConfirm = () => {
    const { teamName, bowlerOrBatsman } = this.state.dialogData;

    // Update the state with the new data
    this.setState((prevState) => ({
      myTeams: [...prevState.myTeams, teamName],
      showDialog: false,
    }));

    // Add the team name with pending status to the pendingRequests array
    const newRequest = {
      team: teamName,
      status: "pending",
      bowlerOrBatsman: bowlerOrBatsman,
    };
    this.setState((prevState) => ({
      pendingRequests: [...prevState.pendingRequests, newRequest],
    }));
  };

  handleDialogCancel = () => {
    this.setState({ showDialog: false });
  };

  togglePendingRequests = () => {
    this.setState((prevState) => ({
      showPendingRequests: !prevState.showPendingRequests,
    }));
  };

  toggleYourTeams = () => {
    this.setState((prevState) => ({
      showYourTeams: !prevState.showYourTeams,
    }));
  };

  render() {
    const {
      searchQuery,
      searchResults,
      showPendingRequests,
      pendingRequests,
      showYourTeams,
      myTeams,
      showDialog,
      dialogData,
      options,
    } = this.state;

    const searchContainerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "16px",
    };

    const labelStyle = {
      marginBottom: "8px",
    };

    const searchBarStyle = {
      display: "flex",
      alignItems: "center",
      width: "300px",
      padding: "8px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      marginBottom: "5px",
    };

    const searchInputStyle = {
      flex: "1",
      border: "none",
      outline: "none",
    };

    const searchResultsStyle = {
      marginTop: "16px",
    };

    const teamItemStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px",
      marginBottom: "4px",
      width: "300px",
      backgroundColor: "#f1f1f1",
      borderRadius: "4px",
    };

    const joinButtonStyle = {
      display: "flex",
      alignItems: "center",
      padding: "4px 8px",
      borderRadius: "20px",
      backgroundColor: "#4CAF50",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    };

    const joinIconStyle = {
      marginRight: "4px",
    };

    const closeButtonStyle = {
      position: "absolute",
      top: "8px",
      right: "8px",
      padding: "4px",
      borderRadius: "4px",
      backgroundColor: "lightgray",
      cursor: "pointer",
    };

    const statusColors = {
      pending: "yellow",
      rejected: "red",
      accepted: "green",
      cancelled: "gray",
    };

    const requestContainerStyle = {
      border: "1px solid black",
      borderRadius: "4px",
      padding: "8px",
      marginBottom: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    };

    const buttonContainerStyle = {
      display: "flex",
      justifyContent: "center",
      marginBottom: "16px",
    };

    const buttonStyle = {
      padding: "8px 16px",
      borderRadius: "20px",
      backgroundColor: "#4CAF50",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      margin: "0 8px",
    };

    return (
      <div>
        <HeaderBar />
        <div style={searchContainerStyle}>
          <label style={labelStyle}>Search teams around you</label>
          <div style={searchBarStyle}>
            <input
              type="text"
              value={searchQuery}
              onChange={this.handleSearchChange}
              placeholder="Search team to join"
              style={searchInputStyle}
            />
            <i className="fa fa-search"></i>
          </div>

          <div style={searchResultsStyle}>
            {searchResults.map((team, index) => (
              <div key={index} style={teamItemStyle}>
                {team}
                {myTeams.includes(team) ? (
                  <span>Already Joined</span>
                ) : (
                  <button
                    style={joinButtonStyle}
                    onClick={() => this.joinTeam(team)}
                  >
                    <i className="fa fa-plus" style={joinIconStyle}></i> Join
                  </button>
                )}
              </div>
            ))}
          </div>

          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={this.togglePendingRequests}>
              View Pending Requests
            </button>
            <button style={buttonStyle} onClick={this.toggleYourTeams}>
              Your Teams
            </button>
          </div>

          {showPendingRequests && (
            <div style={dialogStyle}>
              <h2>Pending Requests</h2>
              {pendingRequests.map((request, index) => (
                <div
                  key={index}
                  style={{
                    ...requestContainerStyle,
                    borderColor: "black",
                  }}
                >
                  <p>Team: {request.team}</p>
                  <p style={{ color: statusColors[request.status] }}>
                    Status: {request.status}
                  </p>
                  {request.status === "pending" && (
                    <button
                      style={joinButtonStyle}
                      onClick={() => this.cancelRequest(request.team)}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              ))}
              <div
                style={closeButtonStyle}
                onClick={this.togglePendingRequests}
              >
                Close
              </div>
            </div>
          )}

          {showYourTeams && (
            <div style={dialogStyle}>
              <h2>Your Teams</h2>
              {myTeams.map((team, index) => (
                <div
                  key={index}
                  style={{
                    ...requestContainerStyle,
                    borderColor: "black",
                  }}
                >
                  <p>Team: {team}</p>
                </div>
              ))}
              <div style={closeButtonStyle} onClick={this.toggleYourTeams}>
                Close
              </div>
            </div>
          )}

          {showDialog && (
            <div style={dialogStyle}>
              <h2>Join Team</h2>
              <p>Team: {dialogData.teamName}</p>
              <p>Please enter your details:</p>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Age" />
              <input type="text" placeholder="City" />
              <select
                value={dialogData.bowlerOrBatsman}
                onChange={(e) =>
                  this.setState({
                    dialogData: {
                      ...dialogData,
                      bowlerOrBatsman: e.target.value,
                    },
                  })
                }
              >
                <option value="">Select option</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button onClick={this.handleDialogConfirm}>Confirm</button>
              <button onClick={this.handleDialogCancel}>Cancel</button>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}
