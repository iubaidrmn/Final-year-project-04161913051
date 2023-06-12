import React, { Component } from 'react';
import { getTournaments, matchSave } from '../services/api';
import HeaderBar from '../includes/header';
import Sidebar from '../includes/sidebar';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament_id: '',
            title: '',
            description : '',
            start_date: '',
            start_time: '',
            status: '1',
            created_at: '',
            tournaments : [],
            isError: false,
            isLoading: true,
        }
    }

    async componentDidMount() {
      try {
        const tournaments = await getTournaments();
        this.setState({ tournaments, isLoading: false});
      } catch (error) {
        this.setState({ isError: true, isLoading: false});
      }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const {tournament_id, title, description, start_date, start_time, status, created_at } = this.state;
        const matchData = {tournament_id, title, description, start_date, start_time, status, created_at };
    
        matchSave(matchData)
          .then((data) => {
            if (data.response === true) {
              this.setState({ error: data.message });
              window.location.replace("/NewsFeed")
            } else {
              this.setState({ error: data.error });
            }
          })
          .catch((error) => {
            this.setState({ error: error.message });
          });
    };

    render() {
      const {tournament_id, title, description, start_date, start_time, error, tournaments } = this.state;
      return (
        <div className="news-feed">
          <HeaderBar />
          <div className="content">
            {/* <Sidebar /> */}
            <div className='container'>
            <h2>Create a Match</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Date:</label>
                      <input
                        type="date"
                        name="start_date"
                        value={start_date}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tournament:</label>
                      <select name="tournament_id" value={tournament_id} onChange={this.handleChange}>
                        <option value="">Select Tournament</option>
                        {tournaments.map((tournament) => (
                          <option value={tournament._id}>{tournament.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <label>Description:</label>
                      <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Start Time:</label>
                      <input
                        type="time"
                        name="start_time"
                        value={start_time}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="submit-button">
                  Create Match
                </button>
              </form>
            </div>
          </div>
          <Footer />
      </div>
      );
    }
}  