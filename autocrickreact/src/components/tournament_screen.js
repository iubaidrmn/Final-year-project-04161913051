import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { getTournaments, get_tournament_schedule } from "../services/api";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";

export default class TournamentScreen extends Component {
	
	  constructor(props) {
    super(props);
    this.state = {
      tournaments: [],
	  schedule: [],
	  tournamentName: null,
	  venue: null,
    };
  }
  
    handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
    if (event.target.name === "tournament_id") {
      const selectedTournament = this.state.tournaments.find(
        (tournament) => tournament._id === event.target.value
      );
      const tournamentName = selectedTournament ? selectedTournament.title : "";
      const venue = selectedTournament ? selectedTournament.venue : "";
	  const schedule = await get_tournament_schedule(event.target.value);
      this.setState({ tournamentName, schedule, venue });
    }
  };
  
  async componentDidMount() {
    try {
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {}
  }
  render() {
    const style = {
      container1: {
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
		backgroundColor: '#fffff',
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

    const { tournaments, tournamentName, tournament_id, schedule, venue } = this.state;
	return (
	      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
		              <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>Tournament:</label>
                  <select
                    name="tournament_id"
                    value={tournament_id}
                    onChange={this.handleChange}
                  >
                    <option>Select Tournament</option>
                    {tournaments.map((tournament) => (
                      <option value={tournament._id} key={tournament._id}>
                        {tournament.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              </div>
			  {tournament_id && (
      <div style={style.container1}>
        <div style={style.roundedBox}>
          <h1 style={style.heading}>{tournamentName}</h1>
          <span style={style.label}>All Matches:</span>
          {schedule.map((match, index) => (
            <div key={index} style={style.matchBox}>
              <div>
                <div style={style.teamNames}>
                  {match.team1} vs {match.team2}
                </div>
                <div style={style.matchDetails}>
                  Date: {moment(match.date).format("MMMM DD, YYYY")}, Venue: {venue} , Start Time: {match.time}
                </div>
              </div>
            </div>
          ))}
          <div>
          </div>
        </div>
			  </div>)}
	            </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  containerMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};