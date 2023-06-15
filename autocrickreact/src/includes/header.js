import React from 'react';
import { FaUserCircle, FaBars } from 'react-icons/fa';
import Sidebar from '../includes/sidebar';
import ProfileMenu from './profile-menu';

export default class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isProfileMenuOpen: false,
          isDrawerOpen: false
        };
      }

    handleProfileIconClick = () => {
        this.setState(prevState => ({
            isProfileMenuOpen: !prevState.isProfileMenuOpen
        }));
    };

    toggleDrawer = () => {
        this.setState(prevState => ({
          isDrawerOpen: !prevState.isDrawerOpen
        }));
    };
    
    render() {
        const { isProfileMenuOpen, isDrawerOpen  } = this.state;
        return (
            <div className="header-bar">
                <div className="profile-icon" onClick={this.toggleDrawer}>
                    <FaBars size={24} />
                    {isDrawerOpen && (<Sidebar />)}
                </div>
                <div className="logo">Cricket News</div>
                <div className="profile-icon" onClick={this.handleProfileIconClick}>
                    <FaUserCircle size={24} />
                    {isProfileMenuOpen && (
                        <ProfileMenu />
                    )}
              </div>
            </div>
          );
    }
}