import React from 'react';
import { Link } from 'react-router-dom';
import {FaCog, FaSignOutAlt } from 'react-icons/fa';

export default class ProfileMenu extends React.Component {
  render() {
    return (
        <ul className="profile-menu">
            <li>
                <FaCog />
                <span>Settings</span>
            </li>
            <li>
                <FaSignOutAlt />
                <span>Logout</span>
            </li>
        </ul>
    );
  }
}