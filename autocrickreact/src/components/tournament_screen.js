import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

export class TournamentScreen extends Component {
  handleButtonClick = () => {
    window.alert('Recording has started!');
  };

  render() {
    const tournamentName = 'shaheen';
    const matches = [
      {
        team1: 'Team A',
        team2: 'Team B',
        date: 'July 10, 2023',
        venue: 'Stadium X',
        startTime: '10:00 AM',
        endTime: '12:00 PM',
      },
      {
        team1: 'Team C',
        team2: 'Team D',
        date: 'July 12, 2023',
        venue: 'Stadium Y',
        startTime: '2:00 PM',
        endTime: '4:00 PM',
      },
      // Add more matches as needed
    ];

    const style = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
        padding: '2rem',
      },
      roundedBox: {
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
      },
      heading: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#333',
        textTransform: 'uppercase',
      },
      matchBox: {
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '1.5rem',
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      teamNames: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
        color: '#666',
      },
      matchDetails: {
        fontSize: '1rem',
        color: '#999',
      },
      label: {
        fontWeight: 'bold',
        marginRight: '1rem',
        marginBottom: 20,
      },
      button: {
        display: 'block',
        margin: 'auto', // Add this line
        padding: '1rem 2rem',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '1rem', // Add this line to add spacing between the button and the matchBox
      },
    };

    const todayMatch = {
      team1: 'Team E',
      team2: 'Team F',
      date: 'July 6, 2023',
      venue: 'Stadium Z',
      startTime: '6:00 PM',
      endTime: '8:00 PM',
    };

    return (
      <div style={style.container}>
        <div style={style.roundedBox}>
          <h1 style={style.heading}>{tournamentName} Tournament</h1>
          <span style={style.label}>All Matches:</span>
          {matches.map((match, index) => (
            <div key={index} style={style.matchBox}>
              <div>
                <div style={style.teamNames}>
                  {match.team1} vs {match.team2}
                </div>
                <div style={style.matchDetails}>
                  Date: {match.date}, Venue: {match.venue}, Start: {match.startTime}, End: {match.endTime}
                </div>
              </div>
            </div>
          ))}
          <span style={style.label}>Today's Match:</span>
          <div style={style.matchBox}>
            <div>
              <div style={style.teamNames}>
                {todayMatch.team1} vs {todayMatch.team2}
              </div>
              <div style={style.matchDetails}>
                Date: {todayMatch.date}, Venue: {todayMatch.venue}, Start: {todayMatch.startTime}, End: {todayMatch.endTime}
              </div>
            </div>
          </div>
          <div>
          <button style={style.button} onClick={this.handleButtonClick}>
  <FontAwesomeIcon icon={faMicrophone} style={{ marginRight: '0.5rem' }} />
  Start Recording
</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TournamentScreen;
