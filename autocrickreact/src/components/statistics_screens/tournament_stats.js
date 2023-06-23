import React, { Component } from 'react';
import { getTournaments, getTournamentMatches } from '../../services/api';
import HeaderBar from '../../includes/header';
import Footer from '../../includes/footer';
import { FaEye } from 'react-icons/fa';
import '../../assets/styles.css';
import '../../assets/tableStyling.css';
import MatchesStats from './matches_stats';

export default class TournamentStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      tournament_id: '',
      total_matches: null,
      completed_matches: null,
      remaining_matches: null,
      showMatchesTable: false,
      tournament_matches: null,
    };
  }

  getDataById = (_id) => {
    const foundItem = this.state.tournaments.find(item => item._id === _id);
    return foundItem || null;
  };

  async componentDidMount() {
    try {
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value }, async () => {
        const itemData = this.getDataById(this.state.tournament_id);
        const tournamentMatches = await getTournamentMatches(this.state.tournament_id);
        const matchIds = tournamentMatches.map((tm) => tm._id);
        const remaining_matches = itemData.no_of_matches - matchIds.length;
        this.setState({
            total_matches: itemData.no_of_matches,
            completed_matches: matchIds.length,
            remaining_matches: remaining_matches,
        })
    });
  };

  handleView = async (tournament_id) => {
    var tournament_matches = await getTournamentMatches(tournament_id);
    this.setState({ showMatchesTable: true, tournament_matches });
  }

  renderMatchesList(){
    return <MatchesStats matches={this.state.tournament_matches} />
  }

  render() {
    const { tournaments, tournament_id, total_matches, completed_matches, remaining_matches } = this.state;
    const selectedItem = this.getDataById(tournament_id);
    return (
      <div className="page-container">
        <HeaderBar />
        <div className="content-wrap">
          <div className="table-info">
            <h2 className="table-title">{''}</h2>
            <center>
                <div className="form-group">
                    <select name="tournament_id" value={tournament_id} onChange={this.handleChange}>
                        <option value="">Select Tournament</option>
                        {tournaments.map((tournament) => (
                        <option key={tournament._id} value={tournament._id}>{tournament.title}</option>
                        ))}
                    </select>
                </div>
            </center>
          </div>
          {tournament_id && (
          <table className="table centered smaller">
            <thead>
            <tr>
                <th colSpan="7" style={{ textAlign: 'center' }}>Tournament Statistics</th>
            </tr>
              <tr>
                <th style={{ textAlign: 'center' }}>Total Matches</th>
                <th style={{ textAlign: 'center' }}>Matches Completed</th>
                <th style={{ textAlign: 'center' }}>Matches Remaining</th>
                <th style={{ textAlign: 'center' }}>Venue / Location</th>
                <th style={{ textAlign: 'center' }}>Start Date</th>
                <th style={{ textAlign: 'center' }}>End Date</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                    <td style={{ textAlign: 'center' }}>{total_matches ?? ''}</td>
                    <td style={{ textAlign: 'center' }}>{completed_matches ?? ''}</td>
                    <td style={{ textAlign: 'center' }}>{remaining_matches ?? ''}</td>
                    <td style={{ textAlign: 'center' }}>{selectedItem && (selectedItem.venue ?? '')}</td>
                    <td style={{ textAlign: 'center' }}>{selectedItem && (selectedItem.start_date ?? '')}</td>
                    <td style={{ textAlign: 'center' }}>{selectedItem && (selectedItem.end_date ?? '')}</td>
                    <td>
                      {selectedItem &&
                      <button className="edit-button" style={{ alignItems: 'center' }}
                        onClick={() => this.handleView(selectedItem._id ?? null)}>
                        <FaEye />
                      </button>}
                    </td>
                  </tr>
            </tbody>
          </table> )}
          <br></br>
          {this.state.showMatchesTable && this.renderMatchesList()}
        </div>
        <Footer />
      </div>
    );
  }
}