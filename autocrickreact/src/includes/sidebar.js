import React from 'react';
import { Link } from 'react-router-dom';
import {FaCog, FaSignOutAlt } from 'react-icons/fa';

export default class Sidebar extends React.Component {
  render() {
    return (
        <ul className="sidebar-menu">
            <li className='menu-item'>
              <Link to="/CreatePost" >
                <FaSignOutAlt />
                <span>Create Post</span>
                </Link>
            </li>
            <li className='menu-item'>
              <Link to="/CreateTeam" >
                <FaSignOutAlt />
                <span>Create Team</span>
                </Link>
            </li>
            <li className='menu-item'>
              <Link to="/CreateTeamMembers" >
                <FaSignOutAlt />
                <span>Create Team Members</span>
                </Link>
            </li>
            <li className='menu-item'>
              <Link to="/NewsFeed" >
                <FaSignOutAlt />
                <span>News Feed</span>
                </Link>
            </li>
            <li className='menu-item'>
              <Link to="/TeamDashboard" >
                <FaSignOutAlt />
                <span>Team Dashboard</span>
                </Link>
            </li>
            <li className='menu-item'>
                <Link to="/Tournament" >
                <FaCog />
                  <span>Add Tournament</span>
                </Link>
            </li>
            <li className='menu-item'>
              <Link to="/Match" >
                <FaSignOutAlt />
                <span>Add Match</span>
                </Link>
            </li>
            <li className='menu-item'>
              <Link to="/UserList" >
                <FaSignOutAlt />
                <span>User List</span>
                </Link>
            </li>
        </ul>
    );
  }
}