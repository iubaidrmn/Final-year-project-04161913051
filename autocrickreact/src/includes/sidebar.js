import React from "react";
import { Link } from "react-router-dom";
import { FaNewspaper } from "react-icons/fa";

const menuConfig = {
  1: [
    // Admin
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/CreatePost", icon: <FaNewspaper />, label: "Create Post" },
    { to: "/PostsList", icon: <FaNewspaper />, label: "Posts List" },
    { to: "/MatchSummary", icon: <FaNewspaper />, label: "Match Summary" },
    {
      to: "/TournamentSummary",
      icon: <FaNewspaper />,
      label: "Tournament Summary",
    },
    {
      to: "/Tournaments_TopPlayers",
      icon: <FaNewspaper />,
      label: "Tournaments",
    },
    {
      to: "/Tournament-Schedule",
      icon: <FaNewspaper />,
      label: "Tournament Schedule",
    },
  ],
  2: [
    // Tournament Organizer
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/Tournament", icon: <FaNewspaper />, label: "Add Tournament" },
    { to: "/TournamentList", icon: <FaNewspaper />, label: "Tournaments" },
    { to: "/Match", icon: <FaNewspaper />, label: "Add Match" },
    { to: "/MatchesList", icon: <FaNewspaper />, label: "Matches List" },
    { to: "/TeamsList", icon: <FaNewspaper />, label: "Teams List" },
    { to: "/MatchSummary", icon: <FaNewspaper />, label: "Match Summary" },
    {
      to: "/TournamentSummary",
      icon: <FaNewspaper />,
      label: "Tournament Summary",
    },
    {
      to: "/Pending-Requests",
      icon: <FaNewspaper />,
      label: "Pending Requests",
    },
  ],
  3: [
    // Player
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/CreatePost", icon: <FaNewspaper />, label: "Create Post" },
    { to: "/PostsList", icon: <FaNewspaper />, label: "Posts List" },
    {
      to: "/Tournaments_TopPlayers",
      icon: <FaNewspaper />,
      label: "Tournaments",
    },
    { to: "/MatchSummary", icon: <FaNewspaper />, label: "Match Summary" },
    {
      to: "/TournamentSummary",
      icon: <FaNewspaper />,
      label: "Tournament Summary",
    },
    {
      to: "/Tournament-Schedule",
      icon: <FaNewspaper />,
      label: "Tournament Schedule",
    },
  ],
  4: [
    // Normal User
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/MatchSummary", icon: <FaNewspaper />, label: "Match Summary" },
    {
      to: "/TournamentSummary",
      icon: <FaNewspaper />,
      label: "Tournament Summary",
    },
    {
      to: "/Tournament-Schedule",
      icon: <FaNewspaper />,
      label: "Tournament Schedule",
    },
  ],
  5: [
    // Coach
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    {
      to: "/Tournaments_TopPlayers",
      icon: <FaNewspaper />,
      label: "Tournaments",
    },
    { to: "/CreatePost", icon: <FaNewspaper />, label: "Create Post" },
    { to: "/PostsList", icon: <FaNewspaper />, label: "Posts List" },
    { to: "/CreateTeam", icon: <FaNewspaper />, label: "Create Team" },
    { to: "/TeamsList", icon: <FaNewspaper />, label: "Teams List" },
    { to: "/CreateTeamMembers", icon: <FaNewspaper />, label: "Team Members" },
    { to: "/Players-Details", icon: <FaNewspaper />, label: "Players Details" },
    { to: "/MatchSummary", icon: <FaNewspaper />, label: "Match Summary" },
    {
      to: "/TournamentSummary",
      icon: <FaNewspaper />,
      label: "Tournament Summary",
    },
    {
      to: "/Tournament-Schedule",
      icon: <FaNewspaper />,
      label: "Tournament Schedule",
    },
    {
      to: "/Search-Tournaments",
      icon: <FaNewspaper />,
      label: "Browse All Tournaments",
    },
  ],
  6: [
    // Umpier
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/CreatePost", icon: <FaNewspaper />, label: "Create Post" },
    { to: "/PostsList", icon: <FaNewspaper />, label: "Posts List" },
    { to: "/MatchUpdate", icon: <FaNewspaper />, label: "Match Update" },
    {
      to: "/Tournaments_TopPlayers",
      icon: <FaNewspaper />,
      label: "Tournaments",
    },
    { to: "/MatchSummary", icon: <FaNewspaper />, label: "Match Summary" },
    {
      to: "/TournamentSummary",
      icon: <FaNewspaper />,
      label: "Tournament Summary",
    },
    {
      to: "/Tournament-Schedule",
      icon: <FaNewspaper />,
      label: "Tournament Schedule",
    },
  ],
};

export default class Sidebar extends React.Component {
  render() {
    const role_id = localStorage.getItem("role_id");
    const allowedMenuItems = menuConfig[role_id] || [];

    return (
      <div style={styles.navigationMenu}>
        <ul style={styles.navigationList}>
          {allowedMenuItems.map((menuItem, index) => (
            <li style={styles.navigationItem} key={index}>
              <Link to={menuItem.to} style={styles.navLink}>
                {menuItem.icon}
                <span>&nbsp;&nbsp;{menuItem.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = {
  navigationMenu: {
    width: "200px",
    backgroundColor: "#f0f0f0",
    padding: "20px",
  },
  navigationList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  navigationItem: {
    marginBottom: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
    padding: "10px",
  },
  navLink: {
    display: "flex",
    alignItems: "center",
    color: "#333",
    textDecoration: "none",
    fontSize: "16px",
  },
};
