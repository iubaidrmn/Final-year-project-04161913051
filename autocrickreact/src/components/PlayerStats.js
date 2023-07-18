import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";
import Sidebar from "../includes/sidebar";
import { getByIDGeneric, getUsers } from "../services/api";
import "../assets/styles.css";
import "../assets/tableStats.css";

export default class PlayerStats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			player_stats: [],
			player_id: null,
			players: [],
		};
	}
	
	async componentDidMount() {
		try {
		  const players = await getUsers(3);
		  this.setState({ players });
		} catch (error) {}
	}
	
	handleChange = async (event) => {
		this.setState({ [event.target.name]: event.target.value });
		if(event.target.name === "player_id"){
			const player_stats = await getByIDGeneric(event.target.value, "player_stats", "player_id");
			this.setState({ player_stats });
		}
	}

	render() {
		const { player_stats, player_id, players } = this.state;
		return (
			<div>
				<HeaderBar />
				<div style={styles.container}>
					<Sidebar />
					<div style={styles.containerMain}>
						<div className="content">
							<div className="container">
							  <h2>Player Statistics</h2>
							    <div style={{ backgroundColor: "#FFFFFF", padding: "20px", boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
										borderRadius: "10px", marginBottom: "20px", width: "100%", maxWidth: "750px",
										display: "flex", flexDirection: "column", alignItems: "flex-start",}} >
										<div className="form-group">
											<label>Players:</label>
											<select
											  name="player_id"
											  value={player_id}
											  onChange={this.handleChange}
											>
											  <option>Select Player</option>
											  {players.map((player) => (
												<option value={player._id} key={player._id} >
												  {player.fullname}
												</option>
											  ))}
											</select>
										  </div>
									<table>
										<thead>
											<tr>
											  <th></th>
											  <th><strong>Matches</strong></th>
											  <th><strong>Runs</strong></th>
											  <th><strong>Average Runs</strong></th>
											  <th><strong>Best Runs</strong></th>
											  <th><strong>100s</strong></th>
											  <th><strong>50s</strong></th>
											  <th><strong>30+s</strong></th>
											  <th><strong>4s</strong></th>
											  <th><strong>6s</strong></th>
											</tr>
										</thead>
										<tbody>
										<tr>
										  <th><strong>Overall</strong></th>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.matches_played)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.total_runs)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.average_runs)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.best_runs)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.hundreds)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.fifties)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.thirties_plus)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.fours)}</td>
										  <td>{player_stats.player_stats && (player_stats.player_stats.Overall.sixes)}</td>
										</tr>
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
