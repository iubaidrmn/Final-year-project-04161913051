import React, { Component } from 'react';
import { getTeams, getCoachNameOfTeam } from '../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import '../assets/tableStyling.css';

export default class TeamsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      selectedRow: null,
      coachNames: {},
    };
  }

  async componentDidMount() {
    try {
      const teams = await getTeams();
      this.setState({ teams }, ()=>{this.getCoachNames();});
    } catch (error) {
      console.error('Error loading teams:', error);
    }
  }

  getCoachNames = async () => {
    const { teams } = this.state;
    const coachIds = teams.map((team) => team.coach_id);
    const coachNames = {};

    try {
      const promises = coachIds.map((coachId) => getCoachNameOfTeam(coachId));
      const responses = await Promise.all(promises);

      responses.forEach((response, index) => {
        const coachId = coachIds[index];
        const coachName = response[0].fullname;
        coachNames[coachId] = coachName;
      });

      this.setState({ coachNames });
    } catch (error) {
      console.error('Error loading coach names:', error);
    }
  };

  handleEdit = (row) => {
    this.props.onEdit(row);
    this.setState({ selectedRow: row._id });

  };

  handleDelete = (row) => {
    this.props.onDelete(row);
    this.setState({ selectedRow: null });
  };

  render() {
    const { teams, selectedRow, coachNames } = this.state;

    return (
      <div className="page-container">
        <HeaderBar />
        <div className="content-wrap">
          <div className="table-info">
            <h2 className="table-title">Available Teams</h2>
            <p className="table-description">Showing {teams.length} teams</p>
          </div>
          <table className="table centered smaller">
            <thead>
              <tr>
                <th>ID</th>
                <th>Team</th>
                <th>Coach Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => {
                const coachName = coachNames[team.coach_id] || '';
                return (
                  <tr key={team._id}>
                    <td>{index + 1}</td>
                    <td>{team.title}</td>
                    <td>{coachName}</td>
                    <td>
                      <button className="edit-button" onClick={() => this.handleEdit(team)}>
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => this.handleDelete(team)}>
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