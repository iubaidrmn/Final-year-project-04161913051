import React, { Component } from 'react';
import { tournamentSave } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class Tournament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description : '',
            no_of_matches: '',
            latitude: '76.7878',
            longitude: '344.7676',
            venue: '',
            start_date: '',
            end_date: '',
            status: '1',
            created_at: '2023-06-10 12:00:00',
            error: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at } = this.state;
        const tournamentData = {title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at };
    
        tournamentSave(tournamentData)
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
        const { title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, error } = this.state;
        return (
          <div className="news-feed">
            <HeaderBar />
            <div className="content">
              <div className='container'>
              <h2>Create a Tournament</h2>
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
                        <label>Description:</label>
                        <input
                          type="text"
                          name="description"
                          value={description}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>No of Matches:</label>
                        <input
                          type="text"
                          name="no_of_matches"
                          value={no_of_matches}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        <label>Venue:</label>
                        <input
                          type="text"
                          name="venue"
                          value={venue}
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
                        <label>End Date:</label>
                        <input
                          type="date"
                          name="end_date"
                          value={end_date}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  {error && <p className="error-message">{error}</p>}
                  <button type="submit" className="submit-button">
                    Create Tournament
                  </button>
                </form>
              </div>
            </div>
            <Footer />
        </div>
        );
    }
}  