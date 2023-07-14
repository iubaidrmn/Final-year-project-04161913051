import React, { Component } from "react";
import { get_team_members } from "../services/api";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import "../assets/styles.css";
import "../assets/tableStyling.css";

export default class PlayersDetailsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_members: [],
    };
  }

  async componentDidMount() {
    try {
      const team_members = await get_team_members();
      this.setState({ team_members });
    } catch (error) {}
  }

  render() {
    const { team_members } = this.state;
    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.containerMain}>
            <div className="page-container">
              <div className="content-wrap">
                <div className="table-info">
                  <h2 className="table-title">Players Details</h2>
                  <p className="table-description">
                    Showing {team_members.length} Players Details
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    padding: "20px",
                    boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    maxWidth: "800px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <table className="table centered smaller">
                    <thead>
                      <tr>
                        <th>S#</th>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Matches Played</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team_members.map((team_member, index) => {
                        return (
                          <tr key={team_member._id}>
                            <td>{index + 1}</td>
                            <td>{team_member.player_name}</td>
                            <td>{team_member.team_name}</td>
                            <td>{team_member.total_matches}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
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
    alignItems: "center",
    justifyContent: "center",
  },
};
