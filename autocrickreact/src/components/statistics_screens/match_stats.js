import React, { Component } from 'react';
import HeaderBar from '../../includes/header';
import { getMatcheDetailsById } from '../../services/api';
import Footer from '../../includes/footer';
import { FaEye } from 'react-icons/fa';
import '../../assets/styles.css';
import '../../assets/tableStyling.css';

export default class MatchStats extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _id: this.props._id ?? null,
        matchDetails: null,
    };
  }

    async componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        const _id = searchParams.get('match_id');
        this.setState({ _id }, () => {
            this.getMatchDetailsById(this.state._id);
        });
    }

    getMatchDetailsById = async (matchId) => {
        try {
            const matchDetails = await getMatcheDetailsById(matchId);
            // Assuming getMatcheDetailsById returns an object with match details
            this.setState({ matchDetails });
            console.log(matchDetails);
        } catch (error) {
            console.error('Error loading match details.', error);
        }
    };
  

  render() {
    return (
      <div className="page-container">
        <HeaderBar />
        <div className="content-wrap">
          <div className="table-info">
            <h2 className="table-title">{''}</h2>
          </div>
          <table className="table centered smaller">
            <thead>
            <tr><th colSpan="8" style={{ textAlign: 'center' }}>Match Statistics</th></tr>
              <tr>
                <th style={{ textAlign: 'center' }}>Batsman</th>
                <th style={{ textAlign: 'center' }}>Runs</th>
                <th style={{ textAlign: 'center' }}>Balls</th>
                <th style={{ textAlign: 'center' }}>Overs</th>
                <th style={{ textAlign: 'center' }}>Bowler</th>
                <th style={{ textAlign: 'center' }}>Runs</th>
                <th style={{ textAlign: 'center' }}>Overs</th>
                <th style={{ textAlign: 'center' }}>Wickets</th>
              </tr>
            </thead>
            <tbody>
                {/* map function will be used later */}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                {/* total */}
                <tr>
                    <th style={{ textAlign: 'center' }}>Total</th>
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}>Total</th>
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}></th>
                    <th style={{ textAlign: 'center' }}></th>
                </tr>
            </tbody>
          </table>
        </div>
        <Footer />
      </div>
    );
  }
}