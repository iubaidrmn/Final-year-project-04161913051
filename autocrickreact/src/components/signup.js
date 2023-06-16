import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRoles, signup } from '../services/api';
import '../assets/styles.css';
import SuccessMessage from '../includes/success';
import ErrorMessage from '../includes/error';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      contact_no: '',
      role_id: '',
      created_at: '',
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: '',
      errorMessage: '',
      roles: [],
      isError: false,
      isLoading: true,
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
      const roles = await getRoles();
      this.setState({ roles, isLoading: false});
    } catch (error) {
      this.setState({ isError: true, isLoading: false});
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { fullname, username, email, password, contact_no, role_id, created_at } = this.state;
    const userData = { fullname, username, email, password, contact_no, role_id, created_at };

    signup(userData)
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

  renderSuccessModal() {
    const { successMessage } = this.state;
    return (
      <SuccessMessage
        message={successMessage}
        onClose={this.hideSuccessModal}
        onGoToHomepage={() => {
          this.hideSuccessModal();
          // Redirect to the Login Page
          window.location.replace('/login');
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
    const { fullname, username, email, password, contact_no, role_id, roles, isError } = this.state;

    if (isError) {
      return <div>Error loading roles.</div>;
    }

    return (
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Fullname:</label>
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Contact No:</label>
                <input
                  type="text"
                  name="contact_no"
                  value={contact_no}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>              
              <div className="form-group">
                <label>Role:</label>
                <select name="role_id" value={role_id} onChange={this.handleChange}>
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option value={role.role_id}>{role.role}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {this.state.showSuccessModal && this.renderSuccessModal()}
          {this.state.showErrorModal && this.renderErrorModal()}
          <button type="submit" className="submit-button">
            Register
          </button>
          <p className="signup-link">
            Already have an Account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Signup;
