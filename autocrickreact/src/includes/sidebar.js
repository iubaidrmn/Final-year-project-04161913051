import React from "react";
import { Link } from "react-router-dom";
import { FaNewspaper, FaUsers, FaTrophy, FaPlus } from "react-icons/fa";

const menuConfig = {
  1: [
    // Admin
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/CreatePost", icon: <FaNewspaper />, label: "Create Post" },
    { to: "/PostsList", icon: <FaNewspaper />, label: "Posts List" },
    {
      to: "/Tournaments_TopPlayers",
      icon: <FaNewspaper />,
      label: "Tournaments",
    },
  ],
  2: [
    // Tournament Organizer
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    { to: "/Tournament", icon: <FaTrophy />, label: "Add Tournament" },
    { to: "/TournamentList", icon: <FaTrophy />, label: "Tournaments" },
    { to: "/Match", icon: <FaPlus />, label: "Add Match" },
    { to: "/MatchesList", icon: <FaPlus />, label: "MatchesList" },
    { to: "/TeamsList", icon: <FaUsers />, label: "Teams List" },
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
  ],
  4: [
    // Normal User
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
  ],
  5: [
    // Coach
    { to: "/NewsFeed", icon: <FaNewspaper />, label: "News Feed" },
    //{ to: "/TeamDashboard", icon: <FaUsers />, label: "Team Dashboard" },
    {
      to: "/Tournaments_TopPlayers",
      icon: <FaNewspaper />,
      label: "Tournaments",
    },
    { to: "/CreatePost", icon: <FaNewspaper />, label: "Create Post" },
    { to: "/PostsList", icon: <FaNewspaper />, label: "Posts List" },
    { to: "/CreateTeam", icon: <FaUsers />, label: "Create Team" },
    { to: "/TeamsList", icon: <FaUsers />, label: "Teams List" },
    { to: "/CreateTeamMembers", icon: <FaUsers />, label: "Team Members" },
    { to: "/Players-Details", icon: <FaUsers />, label: "Players Details" },
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
              <Link to={menuItem.to}>
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
    borderBottom: "1px solid #ccc", // Add a gray border to the bottom of each navigation item
    padding: "10px", // Add some padding to the navigation items
  },
};
