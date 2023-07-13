import React, { Component } from 'react';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';

export default class MatchSummary extends Component {
  render() {
    // Random data for demonstration
    const tournamentName = "Shaheen Cup 2023";
    const match = "Team A vs Team B";
    const tossWon = "Team A";
    const batFirst = "Team A";
    const firstInningData = [
      { player: "Player A", score: 50, bowler: "Bowler X", runs: 30, out: 1 },
      { player: "Player B", score: 30, bowler: "Bowler Y", runs: 40, out: 0 },
      { player: "Player C", score: 40, bowler: "Bowler Z", runs: 20, out: 2 },
      { player: "Player C", score: 40, bowler: "Bowler Z", runs: 20, out: 2 },
    ];
    const secondInningData = [
      { player: "Player D", score: 60, bowler: "Bowler W", runs: 35, out: 0 },
      { player: "Player E", score: 20, bowler: "Bowler X", runs: 20, out: 1 },
      { player: "Player F", score: 30, bowler: "Bowler Y", runs: 25, out: 0 },
    ];

    const winningTeam = calculateWinningTeam();
    const target = calculateTarget();

    function calculateWinningTeam() {
      const firstInningTotal = firstInningData.reduce((total, player) => total + player.score, 0);
      const secondInningTotal = secondInningData.reduce((total, player) => total + player.score, 0);

      if (firstInningTotal > secondInningTotal) {
        return "Team A";
      } else {
        return "Team B";
      }
    }

    function calculateTarget() {
      const firstInningTotal = firstInningData.reduce((total, player) => total + player.score, 0);
      return `${firstInningTotal} runs`;
    }

    const firstInningTotal = firstInningData.reduce((total, player) => total + player.score, 0);
    const secondInningTotal = secondInningData.reduce((total, player) => total + player.score, 0);

    return (
        <div>
            <HeaderBar/>
      <div style={{ textAlign: 'center', margin: '20px auto', width: '800px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)' }}>
        <h2 style={{border: '2px solid rgba(0, 0, 0, 0.2)', borderRadius: '10px',padding: '10px',}} >{tournamentName}</h2>
        
        <h3>Match: {match}</h3>
        <p>Toss Won: {tossWon}</p>
        <p>Bat First: {batFirst}</p>

        <div style={{ padding: '10px' }}>
          <h4>First Inning</h4>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Player</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Score</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Bowler</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Runs</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Out</th>
              </tr>
            </thead>
            <tbody>
              {firstInningData.map((data, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.player}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.score}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.bowler}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.runs}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.out}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ border: '1px solid black', padding: '8px' }}>Total Score: {firstInningTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style={{ padding: '10px' }}>
          <h4>Second Inning</h4>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Player</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Score</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Bowler</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Runs</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#F2F2F2' }}>Out</th>
              </tr>
            </thead>
            <tbody>
              {secondInningData.map((data, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.player}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.score}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.bowler}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.runs}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{data.out}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" style={{ border: '1px solid black', padding: '8px' }}>Total Score: {secondInningTotal}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div style={{ padding: '10px' }}>
          <p>Winning Team: {winningTeam}</p>
          <p>Target: {target}</p>
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
}
