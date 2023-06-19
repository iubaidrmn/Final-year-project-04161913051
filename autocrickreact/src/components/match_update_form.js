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
      match_id: '',
      batsman_id: '',
      bowler_id: '',
      runs: '',
      wickets: '',
      players: [],
      matches: [],
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: '',
      errorMessage: '',
      isLoading: true,
      isError: false,
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
    this.setState({ [event.target.name]: event.target.value });
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
    const { match_id, batsman_id, bowler_id, runs, wickets, players, matches } = this.state;
    return (
      <div className="news-feed">
        <HeaderBar />
        <div className="content">
          <div className="container">
            <h2>Match Details</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Match:</label>
                      <select id="match_id" name="match_id"
                          value={match_id}
                          onChange={this.handleChange} >
                            <option value="">Select Match</option>
                            {matches.map((match) => (
                              <option key={match._id} value={match._id}>{match.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                      <label>Bowler:</label>
                      <select id="bowler_id" name="bowler_id"
                          value={bowler_id}
                          onChange={this.handleChange} >
                            <option value="">Select Bowler</option>
                            {players.map((player) => (
                              <option key={player._id} value={player._id}>{player.fullname}</option>
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
                  </div>
                  <div className="col">
                  <div className="form-group">
                      <label>Batsman:</label>
                      <select id="batsman_id" name="batsman_id"
                          value={batsman_id}
                          onChange={this.handleChange} >
                            <option value="">Select Batsman</option>
                            {players.map((player) => (
                              <option key={player._id} value={player._id}>{player.fullname}</option>
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
                  </div>
              </div>
              {this.state.showSuccessModal && this.renderSuccessModal()}
              {this.state.showErrorModal && this.renderErrorModal()}
              <button type="submit" className="submit-button">
                Add Detail
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
