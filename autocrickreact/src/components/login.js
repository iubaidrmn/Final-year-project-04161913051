import React, { Component } from 'react';
import { login } from '../services/api';
import { Link } from 'react-router-dom';
import '../assets/styles.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;
    const userData = { username, password };

    login(userData)
      .then((data) => {
        if(data.response === true){
          this.setState({ error: data.message });
          localStorage.setItem('fullname', data.user['fullname']);
          localStorage.setItem('username', data.user['username']);
          localStorage.setItem('role_id', data.user['role_id']);
          window.location.replace("/UserList")
        } else {
          this.setState({ error: data.error });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={username}
              className="form-input"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              className="form-input"
              onChange={this.handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className='submit-button' type="submit">Login</button>
          <p className="signup-link">
            Not registered yet? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
    );
  }
}