import React, { Component } from 'react';
import { getTournaments, get_tournament_details } from '../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import '../assets/tableStyling.css';

export default class TournamentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
      selectedRow: null,
    };
  }

  async componentDidMount() {
    try {
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  }

  handleEdit = async (row) => {
    try {
      const tournamentDetails = await get_tournament_details(row._id);
      console.log(tournamentDetails);
    } catch (error) {
      // this.showErrorModal(error.message);
    }
  };

  handleDelete = (row) => {
    this.props.onDelete(row);
    this.setState({ selectedRow: null });
  };

  render() {
    const { tournaments } = this.state;

    return (
      <div className="page-container">
        <HeaderBar />
        <div className="content-wrap">
          <div className="table-info">
            <h2 className="table-title">Available Tournaments</h2>
            <p className="table-description">Showing {tournaments.length} tournaments</p>
          </div>
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
                <th>Actions</th>
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
                      <button className="edit-button" onClick={() => this.handleEdit(tournament)}>
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => this.handleDelete(tournament)}>
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