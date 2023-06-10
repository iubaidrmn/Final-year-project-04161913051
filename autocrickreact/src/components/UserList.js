import React, { Component } from 'react';
import { getUsers } from '../services/api';

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
      <div>
        <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
