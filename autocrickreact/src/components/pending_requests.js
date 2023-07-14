import React, { Component } from 'react';
import { FaCheck, FaUser } from 'react-icons/fa';
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";


export class PendingRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingRequests: [
        { name: 'John Doe', age: 25, city: 'New York', type: 'Batsman' },
        { name: 'Jane Smith', age: 28, city: 'Los Angeles', type: 'Bowler' },
        { name: 'Mike Johnson', age: 23, city: 'Chicago', type: 'Batsman' },
        { name: 'Sarah Johnson', age: 27, city: 'San Francisco', type: 'Bowler' },
        { name: 'Robert Williams', age: 29, city: 'Seattle', type: 'Batsman' },
      ],
      responses: [],
    };
  }

  handleAction = (index, action) => {
    const { pendingRequests, responses } = this.state;
    const request = pendingRequests[index];

    let response = '';
    if (action === 'accept') {
      response = 'Accepted';
    } else if (action === 'reject') {
      response = 'Rejected';
    }

    const updatedResponses = [...responses];
    updatedResponses[index] = response;

    this.setState({
      responses: updatedResponses,
    });
  };

  render() {
    const { pendingRequests, responses } = this.state;

    return (
        <div>
            <HeaderBar/>
      <div>
        <h2 style={{ textAlign: 'center', color: '#333' }}>Pending Requests</h2>
        <div
          style={{
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {pendingRequests.map((request, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                display: 'inline-block',
                margin: '10px',
                minWidth: '250px',
                verticalAlign: 'top',
                textAlign: 'center',
              }}
            >
              <div style={{ marginBottom: '8px' }}>
                <FaUser style={{ fontSize: '32px' }} />
              </div>
              <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                Name: {request.name}
              </p>
              <p style={{ color: '#555', marginBottom: '4px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                Age: {request.age}
              </p>
              <p style={{ color: '#555', marginBottom: '4px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                City: {request.city}
              </p>
              <p style={{ color: '#555', marginBottom: '4px' }}>
                <FaCheck style={{ marginRight: '5px' }} />
                Type: {request.type}
              </p>
              <div style={{ marginTop: '10px' }}>
                <button
                  onClick={() => this.handleAction(index, 'accept')}
                  style={{
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => this.handleAction(index, 'reject')}
                  style={{
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  Reject
                </button>
              </div>
              <p style={{ marginTop: '10px', fontStyle: 'italic' }}>Response: {responses[index]}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
}

export default PendingRequests;
