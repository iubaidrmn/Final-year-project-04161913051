import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { getTournaments, get_tournament_stats } from "../services/api";

export default class TournamentSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentName: null,
      tournament_id: null,
      tournaments: [],
      tournamentDetails: [],
    };
  }

  async componentDidMount() {
    try {
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {}
  }

  handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "tournament_id") {
      const tournamentDetails = await get_tournament_stats(event.target.value);
      const selectedTournament = this.state.tournaments.find(
        (tournament) => tournament._id === event.target.value
      );
      const tournamentName = selectedTournament ? selectedTournament.title : "";
      this.setState({ tournamentName, tournamentDetails });
    }
  };

  render() {
    const { tournaments, tournament_id, tournamentName, tournamentDetails } =
      this.state;
    const boxWidth = "900px";
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Tournament:</label>
                  <select
                    name="tournament_id"
                    value={tournament_id}
                    onChange={this.handleChange}
                  >
                    <option>Select Tournament</option>
                    {tournaments.map((tournament) => (
                      <option value={tournament._id} key={tournament._id}>
                        {tournament.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {tournament_id && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "80vh",
                  flexDirection: "column",
                }}
              >
                <h1
                  style={{
                    fontSize: "30px",
                    border: "2px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    padding: "10px",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  {tournamentName}
                </h1>
                <div
                  style={{
                    width: boxWidth,
                    border: "2px solid rgba(0, 0, 0, 0.2)",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
                    padding: "20px",
                    margin: "20px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      backgroundColor: "#f5f5f5",
                      color: "#333",
                      fontSize: "16px",
                      borderCollapse: "collapse",
                      marginTop: "20px",
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          colSpan="6"
                          style={{
                            textAlign: "center",
                            backgroundColor: "#333",
                            color: "#fff",
                            fontSize: "20px",
                            padding: "10px 0",
                          }}
                        >
                          Tournament Summary
                        </th>
                      </tr>
                      <tr>
                        <th
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          Team
                        </th>
                        <th
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          Matches Played
                        </th>
                        <th
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          Won
                        </th>
                        <th
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          Lost
                        </th>
                        <th
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          N/R
                        </th>
                        <th
                          style={{ padding: "10px", border: "1px solid #ccc" }}
                        >
                          Score
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournamentDetails.map((tournamentDetail, index) => (
                        <tr
                          key={index}
                          style={{
                            backgroundColor:
                              tournamentDetail.won_matches ===
                              Math.max(
                                ...tournamentDetails.map((t) => t.won_matches)
                              )
                                ? "#c3f0c8"
                                : "",
                            borderBottom: "1px solid #ccc",
                          }}
                        >
                          <td
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {tournamentDetail.team_title}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {tournamentDetail.total_matches}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {tournamentDetail.won_matches}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {tournamentDetail.lost_matches}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {tournamentDetail.ratings}
                          </td>
                          <td
                            style={{
                              textAlign: "center",
                              padding: "10px",
                              border: "1px solid #ccc",
                            }}
                          >
                            {tournamentDetail.runs}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
