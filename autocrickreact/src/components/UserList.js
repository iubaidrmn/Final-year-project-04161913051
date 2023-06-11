import React, { Component } from 'react';
import { getUsers } from '../services/api';
import HeaderBar from '../includes/header';
import Sidebar from '../includes/sidebar';
import Footer from '../includes/footer';
import '../assets/styles.css';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      isError: false,
    };
  }

  async componentDidMount() {
    try {
      const users = await getUsers();
      this.setState({ users, isLoading: false });
    } catch (error) {
      this.setState({ isError: true, isLoading: false });
    }
  }

  render() {
    const { users, isLoading, isError } = this.state;

    if (isLoading) {
      return <div>Loading users...</div>;
    }

    if (isError) {
      return <div>Error loading users.</div>;
    }

    return (
        <div className="news-feed">
          <HeaderBar />
          <div className="content">
            <Sidebar />
            <h1>User List</h1>
            <ul>
              {users.map((user) => (
                <li key={user.id}>{user.username}</li>
              ))}
            </ul>
          </div>
          <Footer />
      </div>
    );
  }
}

export default UserList;
