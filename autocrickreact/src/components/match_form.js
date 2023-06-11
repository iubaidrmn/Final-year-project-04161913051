import React, { Component } from 'react';
import { matchSave } from '../services/api';
import HeaderBar from '../includes/header';
import Sidebar from '../includes/sidebar';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament_id: '',
            title: '',
            description : '',
            start_date: '',
            end_date: '',
            status: '1',
            created_at: '2023-06-10 12:00:00',
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const {tournament_id, title, description, start_date, end_date, status, created_at } = this.state;
        const matchData = {tournament_id, title, description, start_date, end_date, status, created_at };
    
        matchSave(matchData)
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
      const {tournament_id, title, description, start_date, end_date, status, created_at } = this.state;
      return (
        <div className="news-feed">
          <HeaderBar />
          <div className="content">
            {/* <Sidebar /> */}
              
          </div>
          <Footer />
        </div>
        );
    }
}  