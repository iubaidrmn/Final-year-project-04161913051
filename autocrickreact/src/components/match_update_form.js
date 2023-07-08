import React, { Component } from 'react';
import { matchDetailsSave, getUsers, getMatches } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import SuccessMessage from '../includes/success';
import ErrorMessage from '../includes/error';

export default class MatchUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      match_id: "",
      batsman_id: "",
      bowler_id: "",
      runs: "",
      wickets: "",
      extra: "",
      innings: "",
      outOption: "",
      players: [],
      matches: [],
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
      isLoading: true,
      isError: false,
      current_over: "", // Add the current_over variable to the initial state
      current_ball: "", // Add the current_ball variable to the initial state
    };
  }

  async componentDidMount() {
    try {
      const players = await getUsers(3);
      const matches = await getMatches();
      this.setState({ players, matches, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
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

  handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "extra") {
      this.setState({ extra: value === "" ? "" : 1 });
    } else if (name === "over") {
      this.setState({ current_over: value });
    } else if (name === "ball") {
      this.setState({ current_ball: value });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { match_id, batsman_id, bowler_id, runs, wickets } = this.state;
    const matchDetails = { match_id, batsman_id, bowler_id, runs, wickets };

    matchDetailsSave(matchDetails)
      .then((data) => {
        if (data.response === true) {
          this.showSuccessModal(data.message);
          this.setState({ batsman_id: '', bowler_id: '', runs: '', wickets: '' });
        } else {
          this.showErrorModal(data.error);
        }
      })
      .catch((error) => {
        this.showErrorModal(error.message);
      });
  };

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
          window.location.replace('/NewsFeed');
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
    const { match_id, batsman_id, bowler_id, runs, wickets, players, matches, innings, outOption } = this.state;

    // Generate options for the "over" menu
    const overOptions = [];
    const maxOverValue = 20; // Adjust the maximum value as needed
    for (let i = 1; i <= maxOverValue; i++) {
      overOptions.push(<option key={i} value={i}>{i}</option>);
    }

    // Generate some random row values for the match summary table
    const overSummaryRows = [
      { ball_no: 1, sixes: 0, fours: 1, extra: 0, type_of_extra: "-", wickets: 0, type_of_wicket: "-", total_runs: 1 },
      { ball_no: 2, sixes: 0, fours: 0, extra: 1, type_of_extra: "wide", wickets: 0, type_of_wicket: "-", total_runs: 1 },
      // Add more rows as needed
    ];
    const matchSummaryRows = [
      { over_number: 1, sixes: 2, fours: 4, extra: 1, type_of_extra: "wide", wickets: 0, type_of_wicket: "-", total_runs: 15 },
      { over_number: 2, sixes: 1, fours: 3, extra: 0, type_of_extra: "-", wickets: 1, type_of_wicket: "run_out", total_runs: 12 },
      { over_number: 3, sixes: 0, fours: 2, extra: 1, type_of_extra: "no_ball", wickets: 0, type_of_wicket: "-", total_runs: 10 },
      // Add more rows as needed
    ];

    return (
      <div className="news-feed">
        <HeaderBar />
        <div className="content">
          <div className="container">
            <h2>Match Details</h2>
            <form onSubmit={this.handleSubmit} className="rounded-box">
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>Innings:</label>
                    <select
                      id="innings"
                      name="innings"
                      value={innings}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Innings</option>
                      <option value="first_inning">First Inning</option>
                      <option value="second_inning">Second Inning</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Batsman:</label>
                    <select
                      id="batsman_id"
                      name="batsman_id"
                      value={batsman_id}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Batsman</option>
                      {players.map((player) => (
                        <option key={player._id} value={player._id}>
                          {player.fullname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Bowler:</label>
                    <select
                      id="bowler_id"
                      name="bowler_id"
                      value={bowler_id}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Bowler</option>
                      {players.map((player) => (
                        <option key={player._id} value={player._id}>
                          {player.fullname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Wickets:</label>
                    <input
                      type="text"
                      name="wickets"
                      value={wickets}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Out:</label>
                    <select
                      id="outOption"
                      name="outOption"
                      value={outOption}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Out Option</option>
                      <option value="out">Out</option>
                      <option value="run_out">Run Out</option>
                      <option value="retired_out">Retired Out</option>
                      <option value="not_out">Not Out</option>
                    </select>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Match:</label>
                    <select
                      id="match_id"
                      name="match_id"
                      value={match_id}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Match</option>
                      {matches.map((match) => (
                        <option key={match._id} value={match._id}>
                          {match.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Runs:</label>
                    <input
                      type="text"
                      name="runs"
                      value={runs}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Over:</label>
                    <select
                      id="over"
                      name="over"
                      value={this.state.over}
                      onChange={this.handleChange}
                    >
                      {overOptions}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Ball:</label>
                    <select
                      id="ball"
                      name="ball"
                      value={this.state.ball}
                      onChange={this.handleChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Extra:</label>
                    <select
                      id="extra"
                      name="extra"
                      value={this.state.extra}
                      onChange={this.handleChange}
                    >
                      <option value="">Select Extra</option>
                      <option value="wide">Wide</option>
                      <option value="no_ball">No Ball</option>
                      <option value="bye">Bye</option>
                      <option value="leg_bye">Leg Bye</option>
                    </select>
                  </div>
                </div>
              </div>
              {this.state.showSuccessModal && this.renderSuccessModal()}
              {this.state.showErrorModal && this.renderErrorModal()}
              <div className="submit-button-container">
                <button type="submit" className="submit-button">
                  Add Detail
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="match-summary">
  <h2>Over Summary</h2>
  <table>
    <thead>
      <tr>
        <th>Ball No</th>
        <th>Sixes</th>
        <th>Fours</th>
        <th>Extra</th>
        <th>Type of Extra</th>
        <th>Wickets</th>
        <th>Type of Wicket</th>
        <th>Total Runs</th>
      </tr>
    </thead>
    <tbody>
      {overSummaryRows.map((row, index) => (
        <tr key={index}>
          <td>{row.ball_no}</td>
          <td>{row.sixes}</td>
          <td>{row.fours}</td>
          <td>{row.extra}</td>
          <td>{row.type_of_extra}</td>
          <td>{row.wickets}</td>
          <td>{row.type_of_wicket}</td>
          <td>{row.total_runs}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div className="over-summary"></div>

  <h2>Match Summary</h2>
  <table>
    <thead>
      <tr>
        <th>Over Number</th>
        <th>Sixes</th>
        <th>Fours</th>
        <th>Extra</th>
        <th>Type of Extra</th>
        <th>Wickets</th>
        <th>Type of Wicket</th>
        <th>Total Runs</th>
      </tr>
    </thead>
    <tbody>
      {matchSummaryRows.map((row, index) => (
        <tr key={index}>
          <td>{row.over_number}</td>
          <td>{row.sixes}</td>
          <td>{row.fours}</td>
          <td>{row.extra}</td>
          <td>{row.type_of_extra}</td>
          <td>{row.wickets}</td>
          <td>{row.type_of_wicket}</td>
          <td>{row.total_runs}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <style>
    {`
      .match-summary {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      table {
        border-collapse: collapse;
        width: 100%;
        max-width: 600px;
        margin-top: 20px;
      }

      th, td {
        padding: 10px;
        text-align: center;
        border: 1px solid #ccc;
      }

      thead {
        background-color: #f2f2f2;
        font-weight: bold;
      }

      tbody tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      tbody tr:hover {
        background-color: #eaeaea;
      }

      .over-summary {
        margin-top: 20px;
      }
    `}
  </style>
</div>

        <Footer />
      </div>
    );
  }
}
