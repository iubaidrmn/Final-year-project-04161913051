import React, { Component } from "react";
import { Chart, registerables } from "chart.js";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";

Chart.register(...registerables); // Register all chart types and controllers

class StatsRecords extends Component {
  state = {
    selectedOption: null,
    selectedTournament: null,
    selectedChartType: null,
    showCharts: false,
  };

  chartRef = React.createRef();
  chartInstance = null; // Reference to the chart instance

  handleOptionClick = (option) => {
    this.setState({ selectedOption: option });
  };

  handleTournamentChange = (event) => {
    this.setState({ selectedTournament: event.target.value });
  };

  handleChartTypeChange = (event) => {
    this.setState({ selectedChartType: event.target.value });
  };

  handleStatisticsClick = () => {
    this.setState((prevState) => ({ showCharts: !prevState.showCharts }));
  };

  destroyChart = () => {
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  };

  generateReport = () => {
    const { selectedOption, selectedTournament, selectedChartType } =
      this.state;

    const doc = new jsPDF();

    // Add report title
    doc.setFontSize(20);
    doc.text("Stats Report", 15, 15);

    // Add selected tournament
    doc.setFontSize(16);
    doc.text(`Selected Tournament: ${selectedTournament}`, 15, 30);

    // Add top players or top bowlers section
    doc.setFontSize(18);
    doc.text(
      selectedOption === "topPlayers" ? "Top Players" : "Top Bowlers",
      15,
      45
    );

    // Get the table and chart elements
    const tableElement = document.getElementById("statsTable");
    const chartElement = document.getElementById("statsChart");

    // Convert table to canvas and add to PDF
    html2canvas(tableElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 15, 50, 180, 0);
      if (chartElement) {
        // Convert chart to canvas and add to PDF
        html2canvas(chartElement).then((chartCanvas) => {
          const chartImgData = chartCanvas.toDataURL("image/png");
          doc.addPage();
          doc.addImage(chartImgData, "PNG", 15, 15, 180, 0);
          doc.save("stats_report.pdf");
        });
      } else {
        doc.save("stats_report.pdf");
      }
    });
  };

  renderTopPlayers = () => {
    // Define the data for top players of the selected tournament
    const topPlayersData = {
      tournament1: [
        {
          position: 1,
          name: "Player 1",
          runs: 1000,
          rating: 9.5,
          strikeRate: 120.5,
        },
        {
          position: 2,
          name: "Player 2",
          runs: 900,
          rating: 9.2,
          strikeRate: 110.2,
        },
        // Add more players for tournament1...
      ],
      tournament2: [
        {
          position: 1,
          name: "Player 3",
          runs: 800,
          rating: 9.0,
          strikeRate: 105.3,
        },
        {
          position: 2,
          name: "Player 4",
          runs: 750,
          rating: 8.8,
          strikeRate: 98.6,
        },
        // Add more players for tournament2...
      ],
      // Add more tournaments...
    };

    const topPlayers = topPlayersData[this.state.selectedTournament] || [];

    // Generate data for bar chart
    const playerNames = topPlayers.map((player) => player.name);
    const playerRuns = topPlayers.map((player) => player.runs);

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Generate data for pie chart
    const playerRatings = topPlayers.map((player) => player.rating);
    const pieChartData = {
      labels: playerNames,
      datasets: [
        {
          data: playerRatings,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            // Add more colors if needed
          ],
        },
      ],
    };

    // Destroy the existing chart before rendering a new one
    this.destroyChart();

    // Render charts
    if (this.state.showCharts) {
      setTimeout(() => {
        if (this.state.selectedChartType === "bar") {
          this.chartInstance = new Chart(this.chartRef.current, {
            type: "bar",
            data: {
              labels: playerNames,
              datasets: [
                {
                  label: "Runs",
                  data: playerRuns,
                  backgroundColor: "#36A2EB",
                },
              ],
            },
            options: {
              ...barChartOptions,
              plugins: {
                legend: {
                  display: false,
                },
              },
              layout: {
                padding: {
                  top: 20,
                  right: 10,
                  bottom: 10,
                  left: 10,
                },
              },
            },
          });
        } else if (this.state.selectedChartType === "pie") {
          this.chartInstance = new Chart(this.chartRef.current, {
            type: "pie",
            data: pieChartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                },
              },
              layout: {
                padding: {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                },
              },
            },
          });
        }
      });
    }

    return (
      <div>
        <h2>Top Players</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <table
            id="statsTable"
            style={{
              margin: "0 auto",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Position
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Name
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Runs
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Rating
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Strike Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((player, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.position}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.name}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.runs}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.rating}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {player.strikeRate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.showCharts && (
            <div
              style={{ marginLeft: "20px", width: "400px", height: "400px" }}
            >
              <canvas id="statsChart" ref={this.chartRef} />
            </div>
          )}
        </div>
      </div>
    );
  };

  renderTopBowlers = () => {
    // Define the data for top bowlers of the selected tournament
    const topBowlersData = {
      tournament1: [
        {
          position: 1,
          name: "Bowler 1",
          wickets: 50,
          rating: 9.0,
          average: 20.5,
        },
        {
          position: 2,
          name: "Bowler 2",
          wickets: 45,
          rating: 8.8,
          average: 22.3,
        },
        // Add more bowlers for tournament1...
      ],
      tournament2: [
        {
          position: 1,
          name: "Bowler 3",
          wickets: 40,
          rating: 8.5,
          average: 23.1,
        },
        {
          position: 2,
          name: "Bowler 4",
          wickets: 35,
          rating: 8.2,
          average: 25.8,
        },
        // Add more bowlers for tournament2...
      ],
      // Add more tournaments...
    };

    const topBowlers = topBowlersData[this.state.selectedTournament] || [];

    // Generate data for bar chart
    const bowlerNames = topBowlers.map((bowler) => bowler.name);
    const bowlerWickets = topBowlers.map((bowler) => bowler.wickets);

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Generate data for pie chart
    const bowlerRatings = topBowlers.map((bowler) => bowler.rating);
    const pieChartData = {
      labels: bowlerNames,
      datasets: [
        {
          data: bowlerRatings,
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            // Add more colors if needed
          ],
        },
      ],
    };

    // Destroy the existing chart before rendering a new one
    this.destroyChart();

    // Render charts
    if (this.state.showCharts) {
      setTimeout(() => {
        if (this.state.selectedChartType === "bar") {
          this.chartInstance = new Chart(this.chartRef.current, {
            type: "bar",
            data: {
              labels: bowlerNames,
              datasets: [
                {
                  label: "Wickets",
                  data: bowlerWickets,
                  backgroundColor: "#FF6384",
                },
              ],
            },
            options: {
              ...barChartOptions,
              plugins: {
                legend: {
                  display: false,
                },
              },
              layout: {
                padding: {
                  top: 20,
                  right: 10,
                  bottom: 10,
                  left: 10,
                },
              },
            },
          });
        } else if (this.state.selectedChartType === "pie") {
          this.chartInstance = new Chart(this.chartRef.current, {
            type: "pie",
            data: pieChartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "right",
                },
              },
              layout: {
                padding: {
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                },
              },
            },
          });
        }
      });
    }

    return (
      <div>
        <h2>Top Bowlers</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <table
            id="statsTable"
            style={{
              margin: "0 auto",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "4px",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Position
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Name
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Wickets
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Rating
                </th>
                <th style={{ padding: "8px", border: "1px solid #ccc" }}>
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              {topBowlers.map((bowler, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {bowler.position}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {bowler.name}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {bowler.wickets}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {bowler.rating}
                  </td>
                  <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                    {bowler.average}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {this.state.showCharts && (
            <div
              style={{ marginLeft: "20px", width: "400px", height: "400px" }}
            >
              <canvas id="statsChart" ref={this.chartRef} />
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    const {
      selectedOption,
      selectedTournament,
      selectedChartType,
      showCharts,
    } = this.state;

    return (
      <div>
        <HeaderBar />
        <div style={{ textAlign: "center", margin: "20px" }}>
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              display: "inline-block",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h1>Records</h1>
            <div style={{ marginBottom: "20px" }}>
              <div>
                <span>Select Tournament: </span>
                <select
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 10px",
                  }}
                  value={selectedTournament}
                  onChange={this.handleTournamentChange}
                >
                  <option value="">Select Tournament</option>
                  <option value="tournament1">Tournament 1</option>
                  <option value="tournament2">Tournament 2</option>
                  {/* Add more tournaments */}
                </select>
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    fontSize: "16px",
                    backgroundColor:
                      selectedOption === "topPlayers" ? "#ccc" : "#f0f0f0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  onClick={() => this.handleOptionClick("topPlayers")}
                >
                  Top Players
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    marginRight: "10px",
                    fontSize: "16px",
                    backgroundColor:
                      selectedOption === "topBowlers" ? "#ccc" : "#f0f0f0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  onClick={() => this.handleOptionClick("topBowlers")}
                >
                  Top Bowlers
                </button>
                <select
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: showCharts ? "#ccc" : "#f0f0f0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  value={selectedChartType}
                  onChange={this.handleChartTypeChange}
                >
                  <option value="">Select Chart Type</option>
                  <option value="bar">Bar Chart</option>
                  <option value="pie">Pie Chart</option>
                </select>
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#f0f0f0",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    margin: "0 5px",
                  }}
                  onClick={this.handleStatisticsClick}
                >
                  Statistics
                </button>
                {showCharts && (
                  <button
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      backgroundColor: "#f0f0f0",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      margin: "0 5px",
                    }}
                    onClick={this.generateReport}
                  >
                    Generate Report
                  </button>
                )}
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              {selectedOption === "topPlayers" && this.renderTopPlayers()}
              {selectedOption === "topBowlers" && this.renderTopBowlers()}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default StatsRecords;
