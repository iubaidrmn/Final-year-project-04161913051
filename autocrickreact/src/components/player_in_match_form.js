import React, { Component } from 'react';
import { playersInMatchSave } from '../services/api';
import '../assets/styles.css';

export default class PlayerInMatch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: '',
            match_id: '',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const {user_id, match_id } = this.state;
        const playerInMatchData = {user_id, match_id };
    
        playersInMatchSave(playerInMatchData)
          .then((data) => {
            if (data.response === true) {
              this.setState({ error: data.message });
              window.location.replace("/NewsFeed")
            } else {
              this.setState({ error: data.error });
            }
          })
          .catch((error) => {
            this.setState({ error: error.message });
          });
    };

    render() {
      const {user_id, match_id } = this.state;
      return (
            <>
            {/* Frontend Part Starts Here */}
            </>
        );
    }
}  