import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import {
  get_top_players,
  getCoachNameOfTeam,
  getTournaments,
} from "../services/api";
import { FaUserCircle } from "react-icons/fa";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      top_players: [],
      playerNames: {},
      tournaments: [],
    };
  }

  async componentDidMount() {
    try {
      const top_players = await get_top_players();
      const tournaments = await getTournaments();
      this.getPlayerNames();
      this.setState({ top_players, tournaments });
    } catch (error) {}
  }

  getPlayerNames = async () => {
    const { top_players } = this.state;
    const playerIds = top_players.map((player) => player.batsman_id);
    const playerNames = {};

    try {
      const promises = playerIds.map((playerId) =>
        getCoachNameOfTeam(playerId)
      );
      const responses = await Promise.all(promises);

      responses.forEach((response, index) => {
        const playerId = playerIds[index];
        const playerName = response[0].fullname;
        playerNames[playerId] = playerName;
      });

      this.setState({ playerNames });
    } catch (error) {
      console.error("Error loading player names:", error);
    }
  };

  handleSliderPress = () => {
    alert("Click successfully"); // Show an alert dialog
  };

  handleLeftNavigation = () => {
    const { currentImageIndex } = this.state;
    const previousIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 0;
    this.setState({ currentImageIndex: previousIndex });
  };

  handleRightNavigation = () => {
    const { currentImageIndex, tournaments } = this.state;
    const lastIndex = tournaments.length - 1;
    const nextIndex =
      currentImageIndex < lastIndex ? currentImageIndex + 1 : lastIndex;
    this.setState({ currentImageIndex: nextIndex });
  };

  render() {
    const { currentImageIndex, top_players, playerNames, tournaments } =
      this.state;
    const currentTournament = tournaments[currentImageIndex];
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div style={styles.content}>
              <h2 style={styles.heading}>Recent Tournaments</h2>
              <div style={styles.sliderContainer}>
                <div style={styles.slider} onClick={this.handleSliderPress}>
                  {currentTournament && (
                    <div>
                      <img
                        style={styles.sliderImage}
                        src={currentTournament.file_path.substring(
                          currentTournament.file_path.lastIndexOf("posts/")
                        )}
                        alt={currentTournament.title}
                      />
                      <div style={styles.tournamentDetails}>
                        <h3 style={styles.tournamentTitle}>
                          {currentTournament.title}
                        </h3>
                        <p style={styles.tournamentInfo}>
                          Start Date: {currentTournament.start_date}
                        </p>
                        <p style={styles.tournamentInfo}>
                          Venue: {currentTournament.venue}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div style={styles.navigationContainer}>
                  <button
                    style={styles.navigationButton}
                    onClick={this.handleLeftNavigation}
                  >
                    &lt;
                  </button>
                  <button
                    style={styles.navigationButton}
                    onClick={this.handleRightNavigation}
                  >
                    &gt;
                  </button>
                </div>
              </div>
              <div style={styles.boxHeadingContainer}>
                <h3 style={styles.boxHeading}>Top Players</h3>
              </div>
              <div style={styles.boxContainer}>
                {top_players.slice(0, 2).map((player, index) => {
                  const playerName = playerNames[player.batsman_id] || "";
                  return (
                    <div
                      style={styles.box}
                      key={index}
                    >
                      <FaUserCircle size={24} style={styles.roundPic} />
                      <p style={styles.text}>{playerName}</p>
                      <p style={styles.text}>
                        Matches Played: {player.total_matches}
                      </p>
                      <p style={styles.text}>Runs: {player.total_runs}</p>
                      <p style={styles.text}>Rate: {player.strike_rate}</p>
                    </div>
                  );
                })}
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
    backgroundColor: "#f5f5f5",
  },
  containerMain: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
  },
  content: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "100%",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  sliderContainer: {
    position: "relative",
    marginBottom: "20px",
    textAlign: "center",
  },
  slider: {
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    width: "100%",
    position: "relative",
  },
  sliderImage: {
    width: "100%",
    height: "auto",
  },
  tournamentDetails: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    borderRadius: "0 0 8px 8px",
  },
  tournamentTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  tournamentInfo: {
    fontSize: "14px",
    marginBottom: "5px",
  },
  navigationContainer: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    transform: "translateY(-50%)",
  },
  navigationButton: {
    backgroundColor: "#ccc",
    color: "#fff",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "24px",
    border: "none",
    outline: "none",
    cursor: "pointer",
  },
  boxHeadingContainer: {
    alignItems: "center",
    marginTop: "20px",
    textAlign: "center",
  },
  boxHeading: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  box: {
    alignItems: "center",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    cursor: "pointer",
    border: "1px solid #ccc",
    marginBottom: "20px",
    /* width: "calc(50% - 20px)", */
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  roundPic: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    marginBottom: "10px",
  },
  text: {
    marginTop: "5px",
    fontSize: "16px",
    textAlign: "center",
  },
};
