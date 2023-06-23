import React, { Component } from 'react';
import {getTeamName } from '../../services/api';
import { FaEye } from 'react-icons/fa';
import '../../assets/styles.css';
import '../../assets/tableStyling.css';
import MatchStats from './match_stats';

export default class MatchesStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
        matches: this.props.matches,
        redirectToMatch: false,
        match_id: null,
    };
  }

  componentDidMount() {
    this.fetchTeamNames();
  }

  fetchTeamNames = async () => {
    const { matches } = this.state;
    try {
      const updatedMatches = await Promise.all(
        matches.map(async (match) => {
          const teamName1 = await getTeamName(match.team_id1);
          const teamName2 = await getTeamName(match.team_id2);
          return { ...match, teamName1, teamName2 };
        })
        );
        this.setState({ matches: updatedMatches});
    } catch (error) {
    }
  };

  handleMatchView = (match_id) =>{
    // this.setState({redirectToMatch: false, match_id});
    window.location.replace(`/MatchStats?match_id=${match_id}`);
  }
  
  render() {
    const { matches } = this.state;
    return (
        <>
          <table className="table centered smaller">
            <thead>
            <tr><th colSpan="7" style={{ textAlign: 'center' }}>Matches</th></tr>
              <tr>
                <th>S#</th>
                <th>Match</th>
                <th>Match Between</th>
                <th>Start Date</th>
                <th>Start Time</th>
                <th style={{ textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
                {matches.map((match, index) => (
                <tr key={match._id}>
                  <td>{index + 1}</td>
                  <td>{match.title}</td>
                  <td>{`${match.teamName1} VS ${match.teamName2}`}</td>
                  <td>{match.start_date}</td>
                  <td>{match.start_time}</td>
                  <td>
                    <button className="edit-button" style={{ alignItems: 'center' }}
                    onClick={()=>this.handleMatchView(match._id)}>
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
    );
  }
}