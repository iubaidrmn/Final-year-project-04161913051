import React, { Component } from 'react';
import { getTournaments, matchSave, get_match_details, updateMatch } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import SuccessMessage from '../includes/success';
import ErrorMessage from '../includes/error';

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
            showSuccessModal: false,
            showErrorModal: false,
            successMessage: '',
            errorMessage: '',
            _id: this.props._id ?? null
        }
    }

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

    async componentDidMount() {
      try {
        if(this.state._id !== null){
          const match = await get_match_details(this.state._id);
          this.setState({ title:match[0].title, description:match[0].description, tournament_id:match[0].tournament_id,
            start_date:match[0].start_date, start_time:match[0].start_time, });
        }
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
        const {tournament_id, title, description, start_date, start_time, status, created_at, _id } = this.state;
        if(_id == null){
          const matchData = {tournament_id, title, description, start_date, start_time, status, created_at };
          matchSave(matchData)
            .then((data) => {
              if (data.response === true) {
                this.showSuccessModal(data.message);
                this.setState({ tournament_id: '', title: '', description : '', start_date: '', 
                  start_time: '', status: '1', created_at: '', });
              } else {
                this.showErrorModal(data.error);
              }
            })
            .catch((error) => {
              this.showErrorModal(error.message);
            });
        } else if(_id !== null){
          const matchDataUpdate = {tournament_id, title, description, start_date, start_time };
          updateMatch(_id, matchDataUpdate)
          .then((data) => {
            if (data.response === true) {
              this.showSuccessModal(data.message);
              this.setState({ tournament_id: '', title: '', description : '', start_date: '', 
                start_time: ''});
            } else {
              this.showErrorModal(data.error);
            }
          })
          .catch((error) => {
            this.showErrorModal(error.message);
          });
        }
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
            window.location.replace('/MatchesList');
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
      const {tournament_id, title, description, start_date, start_time, tournaments, _id } = this.state;
      return (
        <div className="news-feed">
          <HeaderBar />
          <div className="content">
            <div className='container'>
            <h2>{_id == null ? 'Create' : 'Update'} Match</h2>
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
                {this.state.showSuccessModal && this.renderSuccessModal()}
                {this.state.showErrorModal && this.renderErrorModal()}
                <button type="submit" className="submit-button">
                {_id == null ? 'Create' : 'Update'} Match
                </button>
              </form>
            </div>
          </div>
          <Footer />
      </div>
      );
    }
}  