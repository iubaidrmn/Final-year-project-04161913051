import React, { Component } from "react";
import { login } from "../services/api";
import { Link } from "react-router-dom";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";
import HeaderBar from "../includes/headerAuth";
import Footer from "../includes/footer";

export default class Login extends Component {
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
	      <div>
        <HeaderBar />
        <div style={styles.container}>
          <div style={styles.containerMain}>
      <div className="container">
	                    <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "20px",
                      boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                      borderRadius: "10px",
                      marginBottom: "20px",
                      width: "100%",
                      maxWidth: "220px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
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
          {this.state.showSuccessModal && this.renderSuccessModal()}
          {this.state.showErrorModal && this.renderErrorModal()}
          <button className="submit-button" type="submit">
            Login
          </button>
          <p className="signup-link">
            Not registered yet? <Link to="/signup">Signup</Link>
          </p>
        </form>
      </div>
      </div>
      </div>
      </div>
	   <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    /* backgroundColor: "#f5f5f5", */
	backgroundImage: `url('posts/background.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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