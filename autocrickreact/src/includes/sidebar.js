import React from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends React.Component {
  render() {
    return (
        <div className="drawer-icon">
        <ul className="menu">
          <li className="menu-item"><Link to="/UserList">User List</Link></li>
          <li className="menu-item"><Link to="/NewsFeed">News Feed</Link></li>
        </ul>
      </div>
    );
  }
}