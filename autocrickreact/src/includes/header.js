import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ProfileMenu from "./profile-menu";
import Sidebar from "./sidebar";

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileMenuOpen: false,
    };
  }

  handleProfileIconClick = () => {
    this.setState((prevState) => ({
      isProfileMenuOpen: !prevState.isProfileMenuOpen,
    }));
  };

  render() {
    const { isProfileMenuOpen } = this.state;
    return (
      <>
      <div className="header-bar">
        <div className="profile-icon"></div>
        <div className="logo">
          AutoCrick | Local Optimized Cricket Automation
        </div>
        <div className="profile-icon" onClick={this.handleProfileIconClick}>
          <FaUserCircle size={24} />
          {isProfileMenuOpen && <ProfileMenu />}
        </div>
      </div>
      <Sidebar />
      </>
    );
  }
}
