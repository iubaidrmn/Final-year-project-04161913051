import React, { Component } from 'react';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import image from '../assets/image.png';
import video from '../assets/video.mp4';
import { FaUserCircle } from 'react-icons/fa';

export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  render() {
    const boxes = [
      {
        username: 'John Doe',
        profilePic: 'john.jpg',
        title: 'Box 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        media: [image],
      },
      {
        username: 'Jane Smith',
        profilePic: 'jane.jpg',
        title: 'Box 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        media: [image],
      },
      {
        username: 'Alice Johnson',
        profilePic: 'alice.jpg',
        title: 'Box 3',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        username: 'John Doe',
        profilePic: 'john.jpg',
        title: 'Box 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        media: [video],
      },
      {
        username: 'Jane Smith',
        profilePic: 'jane.jpg',
        title: 'Box 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        media: [image],
      },
      {
        username: 'Alice Johnson',
        profilePic: 'alice.jpg',
        title: 'Box 6',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      // Add more boxes as needed
    ];

    return (
      <div className="news-feed">
        <HeaderBar />
        <div className="content">
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>News Feeds</h1>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {boxes.map((box, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '20px',
                  boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  width: '100%',
                  maxWidth: '500px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ width: '30px', height: '30px', marginRight: '10px' }}>
                    <FaUserCircle style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  </div>
                  <div>
                    <h2 style={{ fontWeight: 'bold', fontSize: '20px', margin: 0 }}>{box.username}</h2>
                    <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>June 19, 2023 10:30 AM</p>
                  </div>
                </div>
                <h4 style={{ fontWeight: 'bold', fontSize: '20px', margin: 0 }}>{box.title}</h4>
                {box.description && (
                  <div>
                    <p>{box.description}</p>
                  </div>
                )}
                {box.media && box.media.length > 0 && (
                  <div>
                    {box.media.map((mediaPath, mediaIndex) => {
                      if (mediaPath.endsWith('.png') || mediaPath.endsWith('.jpg') || mediaPath.endsWith('.jpeg')) {
                        return (
                          <img
                            key={mediaIndex}
                            style={{
                              width: '100%',
                              height: 'auto',
                              marginBottom: '10px',
                              borderRadius: '5px',
                            }}
                            src={mediaPath}
                            alt="Newsfeed"
                          />
                        );
                      } else if (mediaPath.endsWith('.mp4')) {
                        return (
                          <video
                            key={mediaIndex}
                            style={{
                              width: '100%',
                              height: 'auto',
                              marginBottom: '10px',
                              borderRadius: '5px',
                            }}
                            controls
                          >
                            <source src={mediaPath} type="video/mp4" />
                          </video>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
