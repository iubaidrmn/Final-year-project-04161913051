import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";

export class TeamDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupVisible: false,
      selectedBoxText: "",
      dashboardTitle: "TEAM DASHBOARD", // Initial title
    };
  }

  handleBoxClick = (text) => {
    this.setState({
      isPopupVisible: true,
      selectedBoxText: text,
    });
  };

  handlePopupClose = () => {
    this.setState({
      isPopupVisible: false,
      selectedBoxText: "",
    });
  };

  render() {
    const { isPopupVisible, selectedBoxText, dashboardTitle } = this.state;

    // Define the text for each box
    const boxTexts = [
      "Add Team Account",
      "Select Players for Team",
      "Browse Local Tournaments",
      "Enroll for a Tournament",
      "Select Custom Kits",
      "Contact Team Players",
    ];

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <span style={styles.text}>{dashboardTitle}</span>
        </div>
        <div style={styles.container}>
          <div style={styles.row}>
            {boxTexts.map((text, index) => (
              <div
                key={index}
                style={styles.box}
                onClick={() => this.handleBoxClick(text)}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#e3f2fd")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f5f5f5")
                }
              >
                <span style={styles.text}>{text}</span>
              </div>
            ))}
          </div>

          {isPopupVisible && (
            <div style={styles.popup}>
              <div style={styles.popupContent}>
                <span style={styles.popupText}>{selectedBoxText}</span>
                <button
                  style={styles.popupCloseButton}
                  onClick={this.handlePopupClose}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  box: {
    flex: 1,
    height: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    margin: 5,
    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  popupText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  popupCloseButton: {
    backgroundColor: "#f5f5f5",
    padding: "5px 10px",
    borderRadius: 5,
    cursor: "pointer",
  },
};

export default TeamDashboard;
