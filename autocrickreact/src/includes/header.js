import React from "react";
import { FaUserCircle } from "react-icons/fa";
import ProfileMenu from "./profile-menu";

export default class HeaderBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isProfileMenuOpen: false,
      fullName: localStorage.getItem("fullname"),
    };
  }

  handleProfileIconClick = () => {
    this.setState((prevState) => ({
      isProfileMenuOpen: !prevState.isProfileMenuOpen,
    }));
  };

  render() {
    const { isProfileMenuOpen, fullName } = this.state;
    return (
      <>
        <div className="header-bar">
          <div>
			<img  style={{ maxWidth: "100px" }} src={`posts/logo.png`} />
		  </div>
          <div className="logo">
            AutoCrick | Local Optimized Cricket Automation
          </div>
          <div className="profile-icon" onClick={this.handleProfileIconClick}>
            <span className="full-name">{fullName}</span>
            <FaUserCircle size={24} />
            {isProfileMenuOpen && <ProfileMenu />}
          </div>
        </div>
      </>
    );
  }
}
