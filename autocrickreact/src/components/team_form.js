import React, { Component } from 'react';
import { teamSave, getUsers } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import SuccessMessage from '../includes/success';
import ErrorMessage from '../includes/error';

export default class Team extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            coach_id: '',
            players: [],
            created_at: '',
            showSuccessModal: false,
            showErrorModal: false,
            successMessage: '',
            errorMessage: '',
            isLoading: true,
            isError: false,
        }
    }

    async componentDidMount() {
      try {
        const players = await getUsers(5);
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
              this.showSuccessModal(data.message);
            } else {
              this.showErrorModal(data.error);
            }
          })
          .catch((error) => {
            this.showErrorModal(error.message);
          });
    };

    showSuccessModal = (message) => {
      this.setState({ successMessage: message, showSuccessModal: true });
    };
  
    hideSuccessModal = () => {
      this.setState({ showSuccessModal: false });
    };
  
    showErrorModal = (message) => {
      this.setState({ errorMessage: message, showErrorModal: true });
    };
  
    hideErrorModal = () => {
      this.setState({ showErrorModal: false });
    };

    renderSuccessModal() {
      const { successMessage } = this.state;
      return (
        <SuccessMessage
          message={successMessage}
          onClose={this.hideSuccessModal}
          onGoToHomepage={() => {
            this.hideSuccessModal();
            // Redirect to the homepage
            window.location.replace('/NewsFeed');
          }}
        />
      );
    }
  
    renderErrorModal() {
      const { errorMessage } = this.state;
      return (
        <ErrorMessage message={errorMessage} onClose={this.hideErrorModal} />
      );
    }

    render() {
        const { players, title, coach_id } = this.state;
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
                                <option key={player._id} value={player._id}>{player.fullname}</option>
                              ))}
                          </select>
                        </div>
                    </div>
                  </div>
                  {this.state.showSuccessModal && this.renderSuccessModal()}
                  {this.state.showErrorModal && this.renderErrorModal()}
                  <button type="submit" className="submit-button">
                    Create Team
                  </button>
                </form>
              </div>
            </div>
            <Footer />
        </div>
        );
    }
}  