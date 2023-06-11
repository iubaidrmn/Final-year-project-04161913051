import React from 'react';
import HeaderBar from '../includes/header';
import Sidebar from '../includes/sidebar';
import Footer from '../includes/footer';
import '../assets/styles.css';

export default class NewsFeed extends React.Component {
  render() {
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