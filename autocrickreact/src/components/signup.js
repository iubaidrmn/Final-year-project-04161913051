import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRoles, signup } from '../services/api';
import '../assets/styles.css';

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
      created_at: '2023-06-10 12:00:00',
      error: '',
      roles: [],
      isError: false,
      isLoading: true,
    };
  }

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
        if (data.message) {
          this.setState({ error: data.message });
          // this.props.history.push('/login');
        }
      })
      .catch((error) => {
        this.setState({ error: error });
      });
  };

  render() {
    const { fullname, username, email, password, contact_no, error, role_id, roles, isError } = this.state;

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
          {error && <p className="error-message">{error}</p>}
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
