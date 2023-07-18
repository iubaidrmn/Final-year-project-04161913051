import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import { get_user_details, updateUser } from "../services/api";
import "../assets/styles.css";
import SuccessMessage from "../includes/success";
import ErrorMessage from "../includes/error";

class UpdateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      email: "",
      password: "",
      contact_no: "",
      created_at: "",
      showSuccessModal: false,
      showErrorModal: false,
      successMessage: "",
      errorMessage: "",
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
      const userDetails = await get_user_details(
        localStorage.getItem("username")
      );
      // const userDetails = await get_user_details(localStorage.getItem('user_id'));
      this.setState({
        fullname: userDetails[0].fullname,
        username: userDetails[0].username,
        contact_no: userDetails[0].contact_no,
        email: userDetails[0].email,
        password: userDetails[0].password,
      });
    } catch (error) {
      this.setState({ isError: true });
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { fullname, username, email, password, contact_no } = this.state;
    const userData = { fullname, username, email, password, contact_no };

    const userId = localStorage.getItem("username");
    // const userId = localStorage.getItem('user_id');

    updateUser(userId, userData)
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
    const { fullname, username, email, password, contact_no } = this.state;

    return (
      <>
        <HeaderBar />
        <div className="container">
          <h2>Update User</h2>
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
              </div>
            </div>
            {this.state.showSuccessModal && this.renderSuccessModal()}
            {this.state.showErrorModal && this.renderErrorModal()}
            <button type="submit" className="submit-button">
              Update Profile
            </button>
          </form>
        </div>
        <Footer />
      </>
    );
  }
}

export default UpdateUser;
