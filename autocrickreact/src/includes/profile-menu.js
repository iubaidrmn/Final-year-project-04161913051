import React from "react";
import { FaSignOutAlt, FaUserEdit } from "react-icons/fa";

export default class ProfileMenu extends React.Component {
  handleLogout = () => {
    localStorage.clear(); // Clear localStorage
    window.location.replace("/");
  };
  UpdateProfile = () => {
    window.location.replace("/User-Profile");
  };

  render() {
    return (
      <ul className="profile-menu">
        <li onClick={this.UpdateProfile}>
          {" "}
          <FaUserEdit /> <span>Update</span>{" "}
        </li>
        <li onClick={this.handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </li>
      </ul>
    );
  }
}
