import React, { Component } from "react";
import "./auth.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "signIn"
    };
  }

  handleOnClick = (text) => {
    const { type } = this.state;
    if (text !== type) {
      this.setState({ type: text });
    }
  };

  render() {
    const { type } = this.state;
    const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

    return (
      <div className="App body">
        <div className={containerClass} id="container">
          <SignUpForm />
          <SignInForm />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="ghost"
                  id="signIn"
                  onClick={() => this.handleOnClick("signIn")}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  className="ghost "
                  id="signUp"
                  onClick={() => this.handleOnClick("signUp")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
