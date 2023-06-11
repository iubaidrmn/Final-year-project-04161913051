import React, { Component } from 'react';
import { tournamentSave } from '../services/api';
import HeaderBar from '../includes/header';
import Sidebar from '../includes/sidebar';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class Tournament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description : '',
            no_of_matches: '',
            latitude: '',
            longitude: '',
            venue: '',
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
    
        const { title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at } = this.state;
        const tournamentData = {title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at };
    
        tournamentSave(tournamentData)
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
        const { title, description, no_of_matches, latitude, longitude, venue, start_date, end_date, status, created_at } = this.state;
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