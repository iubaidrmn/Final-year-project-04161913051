import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';

export default class ProfileMenu extends React.Component {
  handleLogout = () => {
    localStorage.clear(); // Clear localStorage 
    window.location.replace('/');
  };
  render() {
    return (
      <ul className="profile-menu">
        {/* <li> <FaCog /> <span>Settings</span> </li> */}
        <li onClick={this.handleLogout}><FaSignOutAlt /><span>Logout</span></li>
      </ul>
    );
  }
}