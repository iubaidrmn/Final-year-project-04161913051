import React, { Component } from 'react';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';

export default class TournamentSummary extends Component {
  render() {
    // Sample data for the table
    const teams = [
      { name: 'Team A', matchesPlayed: 10, won: 7, lost: 2, NR: 1, score: 14 },
      { name: 'Team B', matchesPlayed: 9, won: 5, lost: 3, NR: 1, score: 11 },
      { name: 'Team C', matchesPlayed: 8, won: 4, lost: 4, NR: 0, score: 8 },
      { name: 'Team D', matchesPlayed: 7, won: 3, lost: 3, NR: 1, score: 7 },
      { name: 'Team D', matchesPlayed: 11, won: 11, lost: 0, NR: 0, score: 17 },
    ];

    const tournamentName = "Shaheen Tournament 2023";

    // Change the value below to adjust the box width
    const boxWidth = '900px';

    return (
      <div>
        <HeaderBar />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ fontSize: '30px',border: '2px solid rgba(0, 0, 0, 0.2)', borderRadius: '10px',padding: '10px',textAlign: 'center', marginBottom: '20px' }}>{tournamentName}</h1>
          <div
            style={{
              width: boxWidth,
              border: '2px solid rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
              padding: '20px',
              margin: '20px',
            }}
          >
            <table
              style={{
                width: '100%',
                backgroundColor: '#f5f5f5',
                color: '#333',
                fontSize: '16px',
                borderCollapse: 'collapse',
                marginTop: '20px',
              }}
            >
              <thead>
                <tr>
                  <th colSpan="6" style={{ textAlign: 'center', backgroundColor: '#333', color: '#fff', fontSize: '20px', padding: '10px 0' }}>Tournament Summary</th>
                </tr>
                <tr>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Team</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Matches Played</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Won</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Lost</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>N/R</th>
                  <th style={{ padding: '10px', border: '1px solid #ccc' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr
                    key={index}
                    style={{
                      backgroundColor: team.won === Math.max(...teams.map(t => t.won)) ? '#c3f0c8' : '',
                      borderBottom: '1px solid #ccc',
                    }}
                  >
                    <td style={{ textAlign: 'center', padding: '10px', border: '1px solid #ccc' }}>{team.name}</td>
                    <td style={{ textAlign: 'center',padding: '10px', border: '1px solid #ccc' }}>{team.matchesPlayed}</td>
                    <td style={{ textAlign: 'center',padding: '10px', border: '1px solid #ccc' }}>{team.won}</td>
                    <td style={{ textAlign: 'center',padding: '10px', border: '1px solid #ccc' }}>{team.lost}</td>
                    <td style={{ textAlign: 'center',padding: '10px', border: '1px solid #ccc' }}>{team.NR}</td>
                    <td style={{ textAlign: 'center',padding: '10px', border: '1px solid #ccc' }}>{team.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
