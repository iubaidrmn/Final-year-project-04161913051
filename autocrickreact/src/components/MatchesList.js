import React, { Component } from 'react';
import { getMatches, getTournamentNameofMatch } from '../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import Match from '../components/match_form';
import '../assets/styles.css';
import '../assets/tableStyling.css';

export default class MatchesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      tournamentNames: {},
      redirectToMatch: false,
      matchId: null,
    };
  }

  async componentDidMount() {
    try {
      const matches = await getMatches();
      this.setState({ matches }, ()=>{this.getTournamentNames();});
    } catch (error) {
      console.error('Error loading matches:', error);
    }
  }

  getTournamentNames = async () => {
    const { matches } = this.state;
    const tournamentIds = matches.map((match) => match.tournament_id);
    const tournamentNames = {};
    try {
      const promises = tournamentIds.map((tournamentId) => getTournamentNameofMatch(tournamentId));
      const responses = await Promise.all(promises);
      responses.forEach((response, index) => {
        const tournamentId = tournamentIds[index];
        const tournamentName = response[0].title;
        tournamentNames[tournamentId] = tournamentName;
      });

      this.setState({ tournamentNames });
    } catch (error) {
      console.error('Error loading Tournament names:', error);
    }
  };

  handleEdit = (row) => {
    this.setState({
      redirectToMatch: true,
      matchId: row._id,
    });
  };

  handleDelete = (row) => {
  };

  render() {
    const { matches, redirectToMatch, matchId, tournamentNames  } = this.state;
    if (redirectToMatch) {
      return <Match _id={matchId} />;
    }
    return (
      <div className="page-container">
        <HeaderBar />
        <div className="content-wrap">
          <div className="table-info">
            <h2 className="table-title">Available Matches</h2>
            <p className="table-description">Showing {matches.length} matches</p>
          </div>
          <table className="table centered smaller">
            <thead>
              <tr>
                <th>ID</th>
                <th>Match</th>
                <th>Description</th>
                <th>Tournament</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map((match, index) => {
                const tournamentName = tournamentNames[match.tournament_id] || '';
                return (
                  <tr key={match._id}>
                    <td>{index + 1}</td>
                    <td>{match.title}</td>
                    <td>{match.description}</td>
                    <td>{tournamentName}</td>
                    <td>{match.start_date}</td>
                    <td>{match.start_time}</td>
                    <td>
                      <button className="edit-button" onClick={() => this.handleEdit(match)}>
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => this.handleDelete(match)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}