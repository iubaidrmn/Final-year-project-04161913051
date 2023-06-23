import React, { Component } from 'react';
import { tournamentSave, get_tournament_details, updateTournament } from '../services/api';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import '../assets/styles.css';
import SuccessMessage from '../includes/success';
import ErrorMessage from '../includes/error';

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
            created_at: '',
            showSuccessModal: false,
            showErrorModal: false,
            successMessage: '',
            errorMessage: '',
            _id: this.props._id ?? null
        }
    }

    async componentDidMount() {
      if(this.state._id !== null){
        try {
          const tournament = await get_tournament_details(this.state._id);
          this.setState({ title:tournament[0].title,
            description:tournament[0].description, no_of_matches:tournament[0].no_of_matches,
            venue:tournament[0].venue, start_date:tournament[0].start_date, end_date:tournament[0].end_date, });
        } catch (error) {}
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

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at, _id } = this.state;
        const tournamentData = {title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at };
        if(_id == null){
          tournamentSave(tournamentData)
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
        } else if(_id !== null){
          const tournamentDataUpdate = {title, description, no_of_matches, venue, start_date, end_date };
          updateTournament(_id, tournamentDataUpdate)
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
            window.location.replace('/TournamentList');
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
        const { title, description, no_of_matches, venue, start_date, end_date, _id } = this.state;
        return (
          <div className="news-feed">
            <HeaderBar />
            <div className="content">
              <div className='container'>                
              <h2>{_id == null ? 'Create' : 'Update'} Tournament</h2>
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
                  {this.state.showSuccessModal && this.renderSuccessModal()}
                  {this.state.showErrorModal && this.renderErrorModal()}
                  <button type="submit" className="submit-button">
                  {_id == null ? 'Create' : 'Update'}  Tournament
                  </button>
                </form>
              </div>
            </div>
            <Footer />
        </div>
        );
    }
}  