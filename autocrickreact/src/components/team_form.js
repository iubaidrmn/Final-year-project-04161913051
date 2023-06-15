import React, { Component } from 'react';
import { teamSave, getUsers } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            coach_id: '',
            players: [],
            created_at: '',
            error: '',
            isLoading: true,
            isError: false,
        }
    }

    async componentDidMount() {
      try {
        const players = await getUsers();
        this.setState({ players, isLoading: false });
      } catch (error) {
        this.setState({ isError: true, isLoading: false });
      }
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { title, coach_id } = this.state;
        const teamData = {title, coach_id };
    
        teamSave(teamData)
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
        const { players, title, coach_id, error } = this.state;
        return (
          <div className="news-feed">
            <HeaderBar />
            <div className="content">
              <div className='container'>
              <h2>Create Team</h2>
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
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label>Select Coach:</label>
                          <select id="coach_id" name="coach_id"
                            value={coach_id}
                            onChange={this.handleChange} >
                              <option value="">Select Coach</option>
                              {players.map((player) => (
                                <option value={player._id}>{player.fullname}</option>
                              ))}
                          </select>
                        </div>
                    </div>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="submit-button">
                    Create Post
                  </button>
                </form>
              </div>
            </div>
            <Footer />
        </div>
        );
    }
}  