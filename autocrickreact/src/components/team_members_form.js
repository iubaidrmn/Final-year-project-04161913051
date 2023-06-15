import React, { Component } from 'react';
import { teamSave, getUsers } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import Modal from 'react-modal';
import '../assets/styles.css';

export default class TeamMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeam: '',
      players: [],
      selectedCandidate: null,
      showConfirmation: false,
      created_at: '',
      error: '',
      isLoading: true,
      isError: false,
    };
  }

  async componentDidMount() {
    try {
      const players = await getUsers();
      this.setState({ players, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  handleCandidateClick = (candidate) => {
    this.setState({ selectedCandidate: candidate, showConfirmation: true });
  };

  handleConfirmationClose = () => {
    this.setState({ showConfirmation: false });
  };

  handleConfirmationConfirm = () => {
    const { selectedTeam, selectedCandidate } = this.state;
    // Perform the action to add the player to the team
    console.log(`Add ${selectedCandidate.fullname} to Team ${selectedTeam}`);
    this.setState({ showConfirmation: false });
  };

  handleTeamChange = (e) => {
    this.setState({ selectedTeam: e.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, coach_id } = this.state;
    const teamData = { title, coach_id };

    // teamSave(teamData)
    //   .then((data) => {
    //     if (data.response === true) {
    //       this.setState({ error: data.message });
    //       window.location.replace('/NewsFeed');
    //     } else {
    //       this.setState({ error: data.error });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ error: error.message });
    //   });
  };

  renderTable() {
    const { players } = this.state;
    return (
      <table>
        <thead>
          <tr>
            <th>S#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {players.map((player, index) => (
          <tr key={player._id}>
            <td>{index + 1}</td>
            <td>{player.fullname}</td>
            <td>
              <button className='submit-button' onClick={() => this.handleCandidateClick(player)}>
                Add to Team
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }

  renderConfirmationModal() {
    const { selectedCandidate } = this.state;
    return (
      <Modal
        isOpen={this.state.showConfirmation}
        onRequestClose={this.handleConfirmationClose}
        contentLabel="Confirmation Modal"
        className="confirmation-modal"
        overlayClassName="confirmation-modal-overlay"
      >
        <h2>Confirmation</h2>
        <p>
          Are you sure you want to add{' '}
          {selectedCandidate && selectedCandidate.fullname} to the team?
        </p>
        <div className="popup-actions">
          <button onClick={this.handleConfirmationClose}>Cancel</button>
          <button onClick={this.handleConfirmationConfirm}>Confirm</button>
        </div>
      </Modal>
    );
  }

  render() {
    const { selectedTeam, error } = this.state;
    return (
      <div className="news-feed1">
        <HeaderBar />
        <div className="content1">
          <div className="container1">
            <h2>Create Team</h2>
            {/* <form onSubmit={this.handleSubmit}> */}
              <div>
                <div>
                  <label htmlFor="team">Select a Team:</label>
                  <select
                    id="team"
                    value={selectedTeam}
                    onChange={this.handleTeamChange}
                  >
                    <option value="">-- Select Team --</option>
                    <option value="team1">Team 1</option>
                    <option value="team2">Team 2</option>
                    <option value="team3">Team 3</option>
                  </select>
                </div>
                {selectedTeam && this.renderTable()}
                {this.renderConfirmationModal()}
              </div>
              {error && <p className="error-message">{error}</p>}
            {/* </form> */}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
