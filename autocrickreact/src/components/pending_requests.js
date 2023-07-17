import React, { Component } from 'react';
import { FaUserCircle, FaUsers, FaCalendar } from 'react-icons/fa';
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { getTournaments, getByIDGeneric, genericUpdate } from "../services/api";
import moment from "moment";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

export default class PendingRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
		tournament_id: "",
		tournaments: [],
		pendingRequests: [],
		showSuccessModal: false,
		showErrorModal: false,
		successMessage: "",
		errorMessage: "",
    };
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
      const tournaments = await getTournaments();
      this.setState({ tournaments });
    } catch (error) {}
  }
  
    handleChange = async (event) => {
		this.setState({ [event.target.name]: event.target.value });
		if(event.target.name === "tournament_id"){
			const responseData = await getByIDGeneric(event.target.value, "pendingRequests", "tournament_id")
			if(responseData.response === true){
				this.setState({ pendingRequests:responseData.pendingRequests });
				if(responseData.pendingRequests.length === 0){
					this.showErrorModal("No Team Requests Available");
				}
			}
		}
	};
	
	handleAction = async (teamId) =>{
		const status = 1; 
		const data = {status};
		const responseAPI = await genericUpdate("teamId", teamId, data, "updatePendingRequest");
		const responseAPI2 = await genericUpdate("teamId", teamId, data, "updateTeam");
		if(responseAPI.response === true && responseAPI2.response === true){
			this.showSuccessModal("Team Request Accepted");
		} else {
			this.showErrorModal(responseAPI.error);
		}		
	}
	renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          window.location.replace("/Pending-Requests");
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
    const { tournaments, tournament_id, pendingRequests } = this.state;

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
      <div>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Pending Requests</h2>
		<div className="form-group">
			<label>Tournament:</label>
			<select
			  name="tournament_id"
			  value={tournament_id}
			  onChange={this.handleChange}
			>
			  <option value="">Select Tournament</option>
			  {tournaments.map((tournament) => (
				<option value={tournament._id}>
				  {tournament.title}
				</option>
			  ))}
			</select>
		  </div>
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', }} >
          {pendingRequests.map((request, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                display: 'inline-block',
                margin: '10px',
                minWidth: '150px',
                verticalAlign: 'top',
                textAlign: 'center',
				backgroundColor: 'white'
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <FaUserCircle style={{ fontSize: '32px' }} />
              </div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                <FaUsers style={{ marginRight: '5px' }} />
                {request.team_title}
              </p>
              <p style={{ color: '#555', marginBottom: '4px' }}>
                <FaCalendar style={{ marginRight: '5px' }} />
                Requested On: <br></br>{moment(request.created_at).format("MMMM DD, YYYY h:mm A")}
              </p>
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => this.handleAction(request.team_id)}
                  style={{ backgroundColor: '#28a745', color: '#fff',
                    border: 'none', cursor: "pointer", borderRadius: '20px', padding: '8px 16px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', }}>
                  Accept
                </button>
              </div>
            </div>
          ))}
			{this.state.showSuccessModal && this.renderSuccessModal()}
			{this.state.showErrorModal && this.renderErrorModal()}
        </div>
        </div>
       </div>
       </div>
      <Footer/>
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