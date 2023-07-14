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

  summarizeData = () => {
    const data = this.state.matches_details;
    // Sum each batsman's runs
    const batsmanRuns = {};
    data.player_details.forEach((player) => {
      const { batsman_name, runs } = player;
      if (batsmanRuns[batsman_name]) {
        batsmanRuns[batsman_name] += runs;
      } else {
        batsmanRuns[batsman_name] = runs;
      }
    });

    // Count each bowler's wickets
    const bowlerWickets = { first: {}, second: {} };
    data.player_details.forEach((player) => {
      const { bowler_name, wickets, innings } = player;
      if (bowlerWickets[innings][bowler_name]) {
        bowlerWickets[innings][bowler_name] += parseInt(wickets);
      } else {
        bowlerWickets[innings][bowler_name] = parseInt(wickets);
      }
    });

    return { batsmanRuns, bowlerWickets };
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
    const { batsmanRuns, bowlerWickets } = this.summarizeData;
	
    const firstInningData = [
      { player: "Player A", score: 50, bowler: "Bowler X", runs: 30, out: 1 },
      { player: "Player B", score: 30, bowler: "Bowler Y", runs: 40, out: 0 },
      { player: "Player C", score: 40, bowler: "Bowler Z", runs: 20, out: 2 },
      { player: "Player C", score: 40, bowler: "Bowler Z", runs: 20, out: 2 },
    ];
    const secondInningData = [
      { player: "Player D", score: 60, bowler: "Bowler W", runs: 35, out: 0 },
      { player: "Player E", score: 20, bowler: "Bowler X", runs: 20, out: 1 },
      { player: "Player F", score: 30, bowler: "Bowler Y", runs: 25, out: 0 },
    ];

    const winningTeam = calculateWinningTeam();
    const target = calculateTarget();

    function calculateWinningTeam() {
      const firstInningTotal = firstInningData.reduce(
        (total, player) => total + player.score,
        0
      );
      const secondInningTotal = secondInningData.reduce(
        (total, player) => total + player.score,
        0
      );

      if (firstInningTotal > secondInningTotal) {
        return "Team A";
      } else {
        return "Team B";
      }
    }

    function calculateTarget() {
      const firstInningTotal = firstInningData.reduce(
        (total, player) => total + player.score,
        0
      );
      return `${firstInningTotal} runs`;
    }

    const firstInningTotal = firstInningData.reduce(
      (total, player) => total + player.score,
      0
    );
    const secondInningTotal = secondInningData.reduce(
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
                    <option value="">Select Tournament</option>
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
                    <option value="">Select Match</option>
                    {matches.map((match) => (
                      <option value={match._id} key={match._id}>
                        {match.title}
                      </option>
                    ))}
                  </select>
                </div>
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
                {/*<p>Toss Won: {tossWon}</p>
			<p>Bat First: {batFirst}</p>*/}
                <div style={{ padding: "10px" }}>
                  <h4>First Inning</h4>
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Total Score: {firstInningTotal}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div style={{ padding: "10px" }}>
                  <h4>Second Inning</h4>
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
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
                          style={{ border: "1px solid black", padding: "8px" }}
                        >
                          Total Score: {secondInningTotal}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div style={{ padding: "10px" }}>
                  <p>Winning Team: {winningTeam}</p>
                  <p>Target: {target}</p>
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
