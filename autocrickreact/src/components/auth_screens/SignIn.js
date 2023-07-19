import React, { Component } from "react";
import { login } from "../../services/api";
import { Link } from "react-router-dom";
import SuccessMessage from "../../includes/success";
import ErrorMessage from "../../includes/error";

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
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
        if (data.response === true) {
          console.log("data", data);
          localStorage.setItem("user_id", data.user["_id"]);
          localStorage.setItem("fullname", data.user["fullname"]);
          localStorage.setItem("username", data.user["username"]);
          localStorage.setItem("role_id", data.user["role_id"]);
          window.location.replace("/NewsFeed");
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
          window.location.replace("/NewsFeed");
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
    const { username, password } = this.state;

    return (
      <div className="form-container sign-in-container">
        <form onSubmit={this.handleSubmit}>
          <h1>Sign in</h1>
          <input
            type="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
		  {this.state.showSuccessModal && this.renderSuccessModal()}
          {this.state.showErrorModal && this.renderErrorModal()}
          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}