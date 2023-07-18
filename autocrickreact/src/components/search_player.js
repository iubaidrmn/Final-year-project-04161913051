import React, { Component } from "react";
import {
  FaSearch,
  FaUser,
  FaCity,
  FaBowlingBall,
  FaBaseballBall,
} from "react-icons/fa";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";

const getRandomPlayers = () => {
  const players = [];
  const cities = ["New York", "London", "Paris", "Tokyo", "Sydney"];
  const bowlerOptions = [true, false];
  const batsmanOptions = [true, false];

  for (let i = 0; i < 20; i++) {
    const name = `Player ${i + 1}`;
    const age = Math.floor(Math.random() * 20) + 20;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const bowler =
      bowlerOptions[Math.floor(Math.random() * bowlerOptions.length)];
    const batsman =
      batsmanOptions[Math.floor(Math.random() * batsmanOptions.length)];

    players.push({ name, age, city, bowler, batsman });
  }

  return players;
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.3)",
    width: "700px",
    margin: "0 auto",
  },
  label: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "5px",
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    marginRight: "10px",
    width: "200px",
  },
  button: {
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    padding: "8px 12px",
    cursor: "pointer",
  },
  select: {
    borderRadius: "4px",
    border: "1px solid #ccc",
    padding: "5px",
    marginRight: "10px",
  },
  noResults: {
    color: "#ff0000",
    marginBottom: "10px",
  },
  playerButton: {
    border: "none",
    background: "none",
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default class SearchPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      selectedFilters: {
        age: "",
        city: "",
        bowler: "",
        batsman: "",
      },
      searchResults: [],
    };
  }

  componentDidMount() {
    const players = getRandomPlayers();
    this.setState({ searchResults: players });
  }

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleFilterChange = (filter, event) => {
    const selectedFilters = { ...this.state.selectedFilters };
    selectedFilters[filter] = event.target.value;
    this.setState({ selectedFilters });
  };

  renderSearchResults = () => {
    const { searchResults, searchQuery, selectedFilters } = this.state;

    const filteredResults = searchResults.filter((player) => {
      const { name, age, city, bowler, batsman } = player;
      const filterText = searchQuery.toLowerCase();
      const filterCity = selectedFilters.city.toLowerCase();
      const filterBowler = selectedFilters.bowler;
      const filterBatsman = selectedFilters.batsman;
      const filterAge = parseInt(selectedFilters.age);

      const nameMatch = name.toLowerCase().includes(filterText);
      const cityMatch = city.toLowerCase().includes(filterCity);

      const bowlerMatch =
        filterBowler === "" ||
        (bowler && filterBowler === "true") ||
        (!bowler && filterBowler === "false");
      const batsmanMatch =
        filterBatsman === "" ||
        (batsman && filterBatsman === "true") ||
        (!batsman && filterBatsman === "false");
      const ageMatch = isNaN(filterAge) || age === filterAge;

      return nameMatch && cityMatch && bowlerMatch && batsmanMatch && ageMatch;
    });

    if (filteredResults.length === 0) {
      return <div style={styles.noResults}>No results found.</div>;
    }

    return (
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredResults.map((player, index) => (
          <li key={index}>
            <button
              style={styles.playerButton}
              onClick={() => this.handleClickPlayer(player)}
            >
              {player.name} ({player.age} years, {player.city},{" "}
              {player.bowler ? "Bowler" : ""} {player.batsman ? "Batsman" : ""})
            </button>
          </li>
        ))}
      </ul>
    );
  };

  handleClickPlayer = (player) => {
    console.log("Clicked player:", player);
  };

  render() {
    const { searchQuery, selectedFilters } = this.state;

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <label htmlFor="search-input" style={styles.label}>
            <FaSearch /> Find players around you:
          </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              id="search-input"
              placeholder="Search..."
              value={searchQuery}
              style={styles.input}
              onChange={this.handleInputChange}
            />
            <button style={styles.button} onClick={this.handleSearch}>
              <FaSearch />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <label htmlFor="age-filter">
              <FaUser /> Age:
            </label>
            <input
              type="number"
              id="age-filter"
              value={selectedFilters.age}
              style={styles.input}
              onChange={(event) => this.handleFilterChange("age", event)}
            />

            <label htmlFor="city-filter">
              <FaCity /> City:
            </label>
            <input
              type="text"
              id="city-filter"
              value={selectedFilters.city}
              style={styles.input}
              onChange={(event) => this.handleFilterChange("city", event)}
            />

            <label htmlFor="bowler-filter">
              <FaBowlingBall /> Bowler:
            </label>
            <select
              id="bowler-filter"
              value={selectedFilters.bowler}
              style={styles.select}
              onChange={(event) => this.handleFilterChange("bowler", event)}
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label htmlFor="batsman-filter">
              <FaBaseballBall /> Batsman:
            </label>
            <select
              id="batsman-filter"
              value={selectedFilters.batsman}
              style={styles.select}
              onChange={(event) => this.handleFilterChange("batsman", event)}
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          {this.renderSearchResults()}
        </div>
        <Footer />
      </div>
    );
  }
}
