import React from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaUsers, FaTrophy, FaPlus } from 'react-icons/fa';

const menuConfig = {
  '1': [ // Admin
    { to: '/NewsFeed', icon: <FaNewspaper />, label: 'News Feed' },
  ],
  '2': [ // Tournament Organizer
    { to: '/Tournament', icon: <FaTrophy />, label: 'Add Tournament' },
    { to: '/TournamentList', icon: <FaTrophy />, label: 'Tournaments' },
    { to: '/Match', icon: <FaPlus />, label: 'Add Match' },
    { to: '/TeamsList', icon: <FaUsers />, label: 'Teams List' },
  ],
  '3' : [ // Player
    { to: '/NewsFeed', icon: <FaNewspaper />, label: 'News Feed' },
    { to: '/CreatePost', icon: <FaNewspaper />, label: 'Create Post' },
  ],
  '4' : [ // Normal User
    { to: '/NewsFeed', icon: <FaNewspaper />, label: 'News Feed' },
  ],
  '5' : [ // Coach
    { to: '/NewsFeed', icon: <FaNewspaper />, label: 'News Feed' },
    { to: '/TeamDashboard', icon: <FaUsers />, label: 'Team Dashboard' },
    { to: '/CreatePost', icon: <FaNewspaper />, label: 'Create Post' },
    { to: '/CreateTeam', icon: <FaUsers />, label: 'Create Team' },
    { to: '/CreateTeamMembers', icon: <FaUsers />, label: 'Team Members' },
  ],
  '6' : [ // Umpier
    { to: '/NewsFeed', icon: <FaNewspaper />, label: 'News Feed' },
    { to: '/CreatePost', icon: <FaNewspaper />, label: 'Create Post' },
    { to: '/MatchUpdate', icon: <FaNewspaper />, label: 'Match Update' },
  ],
};

export default class Sidebar extends React.Component {
  render() {
    const role_id = localStorage.getItem('role_id');
    const allowedMenuItems = menuConfig[role_id] || [];

    return (
      <ul className="sidebar-menu">
        {allowedMenuItems.map((menuItem, index) => (
          <li className="menu-item" key={index}>
            <Link to={menuItem.to}>
              {menuItem.icon}
              <span>&nbsp;&nbsp;{menuItem.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
