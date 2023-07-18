import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import {
  get_match_details_by_match_id,
  getTournaments,
  get_matches_by_tournament_id,
  get_teams_by_match_id,
} from "../services/api";
import "../assets/styles.css";

export default class MatchSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournamentName: null,
      tournament_id: null,
      tournaments: [],
      match_id: null,
      matches: [],
      teams: [],
      matches_details: [],
    };
  }

  async componentDidMount() {
    try {
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {}
  }

  summarizeData = (data) => {
    // Sum each batsman's runs in first and second innings
    const batsmanRuns = { first: {}, second: {} };
    data.forEach((player) => {
      const { batsman_name, runs, innings } = player;
      if (batsmanRuns[innings][batsman_name]) {
        batsmanRuns[innings][batsman_name] += runs;
      } else {
        batsmanRuns[innings][batsman_name] = runs;
      }
    });

    // Count each bowler's wickets in first and second innings
    const bowlerWickets = { first: {}, second: {} };
    const bowlerRuns = { first: {}, second: {} };
    data.forEach((player) => {
      const { bowler_name, wickets, innings, runs } = player;
      if (bowlerWickets[innings][bowler_name]) {
        bowlerWickets[innings][bowler_name] += parseInt(wickets);
      } else {
        bowlerWickets[innings][bowler_name] = parseInt(wickets);
      }

      if (bowlerRuns[innings][bowler_name]) {
        bowlerRuns[innings][bowler_name] += runs;
      } else {
        bowlerRuns[innings][bowler_name] = runs;
      }
    });

    return { batsmanRuns, bowlerWickets, bowlerRuns };
  };

  handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "tournament_id") {
      const matches = await get_matches_by_tournament_id(event.target.value);
      const selectedTournament = this.state.tournaments.find(
        (tournament) => tournament._id === event.target.value
      );
      const tournamentName = selectedTournament ? selectedTournament.title : "";
      this.setState({ matches, tournamentName });
    }
    if (event.target.name === "match_id") {
      const teams = await get_teams_by_match_id(event.target.value);
      const matches_details = await get_match_details_by_match_id(
        event.target.value
      );
      this.setState({ teams, matches_details });
    }
  };

  render() {
    const {
      tournaments,
      tournament_id,
      matches,
      match_id,
      tournamentName,
      teams,
      matches_details,
    } = this.state;
    let firstInningData = [];
    let secondInningData = [];
    if (match_id !== null && matches_details.length > 0) {
      const data = matches_details;
      firstInningData = data
        .filter((item) => item.innings === "first")
        .reduce((acc, item) => {
          const playerIndex = acc.findIndex(
            (player) => player.player === item.batsman_name
          );
          if (playerIndex === -1) {
            acc.push({
              player: item.batsman_name,
              score: parseInt(item.runs) + parseInt(item.extras),
              bowler: item.bowler_name,
              runs: parseInt(item.runs) + parseInt(item.extras),
              out: item.outOption !== "not_out" ? 1 : 0,
            });
          } else {
            acc[playerIndex].score = acc[playerIndex].score + item.runs + parseInt(item.extras);
            acc[playerIndex].runs = acc[playerIndex].runs + item.runs + parseInt(item.extras);
            if (item.outOption !== "not_out") {
              acc[playerIndex].out += 1;
            }
          }
          return acc;
        }, []);

      secondInningData = data
        .filter((item) => item.innings === "second")
        .reduce((acc, item) => {
          const playerIndex = acc.findIndex(
            (player) => player.player === item.batsman_name
          );
          if (playerIndex === -1) {
            acc.push({
              player: item.batsman_name,
              score: parseInt(item.runs) + parseInt(item.extras),
              bowler: item.bowler_name,
              runs: parseInt(item.runs) + parseInt(item.extras),
              out: item.outOption !== "not_out" ? 1 : 0,
            });
          } else {
            acc[playerIndex].score = acc[playerIndex].score + item.runs + parseInt(item.extras);
            acc[playerIndex].runs = acc[playerIndex].runs + item.runs + parseInt(item.extras);
            if (item.outOption !== "not_out") {
              acc[playerIndex].out += 1;
            }
          }
          return acc;
        }, []);
    }
    // Calculate total scores for each inning
    const firstInningTotalScore = firstInningData.reduce(
      (total, player) => total + player.score,
      0
    );
    const secondInningTotalScore = secondInningData.reduce(
      (total, player) => total + player.score,
      0
    );
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
              <div className="col">
                <div className="form-group">
                  <label>Match:</label>
                  <select
                    name="match_id"
                    value={match_id}
                    onChange={this.handleChange}
                  >
                    <option>Select Match</option>
                    {matches.map((match) => (
                      <option value={match._id} key={match._id}>
                        {match.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {tournament_id && (
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
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    margin: "20px auto",
                    width: "800px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  <h2
                    style={{
                      border: "2px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    {tournamentName}
                  </h2>

                  {match_id && (
                    <h3>
                      Match: {teams[0]} Vs {teams[1]}
                    </h3>
                  )}
                  <div style={{ padding: "10px" }}>
                    <h4>First Inning</h4>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Player
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Score
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Bowler
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Runs
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Out
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {firstInningData.map((data, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.player}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.score}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.bowler}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.runs}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.out}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan="5"
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            Total Score: {firstInningTotalScore}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div style={{ padding: "10px" }}>
                    <h4>Second Inning</h4>
                    <table
                      style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Player
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Score
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Bowler
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Runs
                          </th>
                          <th
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                              backgroundColor: "#F2F2F2",
                            }}
                          >
                            Out
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {secondInningData.map((data, index) => (
                          <tr key={index}>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.player}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.score}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.bowler}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.runs}
                            </td>
                            <td
                              style={{
                                border: "1px solid black",
                                padding: "8px",
                              }}
                            >
                              {data.out}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td
                            colSpan="5"
                            style={{
                              border: "1px solid black",
                              padding: "8px",
                            }}
                          >
                            Total Score: {secondInningTotalScore}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div style={{ padding: "10px" }}>
                    <p>
                      Winning Team:{" "}
                      {firstInningTotalScore > secondInningTotalScore
                        ? teams[0]
                        : teams[1]}
                    </p>
                    <p>Target: {firstInningTotalScore + 1}</p>
                  </div>
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
