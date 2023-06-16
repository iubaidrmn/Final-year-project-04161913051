import React from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaUsers, FaTrophy, FaPlus } from 'react-icons/fa';

export default class Sidebar extends React.Component {
  render() {
    return (
      <ul className="sidebar-menu">
      <li className='menu-item'>
        <Link to="/CreatePost">
          <FaNewspaper />
          <span>&nbsp;&nbsp;Create Post</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/CreateTeam">
          <FaUsers />
          <span>&nbsp;&nbsp;Create Team</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/CreateTeamMembers">
          <FaUsers />
          <span>&nbsp;&nbsp;Team Members</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/NewsFeed">
          <FaNewspaper />
          <span>&nbsp;&nbsp;News Feed</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/TeamDashboard">
          <FaUsers />
          <span>&nbsp;&nbsp;Team Dashboard</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/Tournament">
          <FaTrophy />
          <span>&nbsp;&nbsp;Add Tournament</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/TournamentList">
          <FaTrophy />
          <span>&nbsp;&nbsp;Tournaments</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/Match">
          <FaPlus />
          <span>&nbsp;&nbsp;Add Match</span>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to="/TeamsList">
          <FaUsers />
          <span>&nbsp;&nbsp;Teams List</span>
        </Link>
      </li>
    </ul>

    );
  }
}