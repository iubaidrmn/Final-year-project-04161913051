import React from 'react';
import HeaderBar from '../includes/header';
import Sidebar from '../includes/sidebar';
import Footer from '../includes/footer';
import image from '../assets/image.png'; // Import the image
import video from '../assets/video.mp4'; // Import the video

export default class NewsFeed extends React.Component {
  getRandomColor() {
    // Generate a random color in hexadecimal format
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    // Sample data for the boxes
    const boxes = [
      {
        title: 'Box 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        images: [image, image, image], // Multiple image paths for Box 1
        videos: [video, video], // Multiple video paths for Box 1
      },
      {
        title: 'Box 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        images: [image, image, image], // Multiple image paths for Box 1
      },
      {
        title: 'Box 2',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // No images and videos for Box 2
      },
      {
        title: 'Box 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        images: [image, image, image], // Multiple image paths for Box 1
        videos: [video, video], // Multiple video paths for Box 1
      },
      {
        title: 'Box 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        images: [image, image, image], // Multiple image paths for Box 1
      },
      {
        title: 'Box 2',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        // No images and videos for Box 2
      },
      // Add more boxes as needed
    ];

    const newsFeedsTitle = 'News Feeds';

    return (
      <div className="news-feed">
        <HeaderBar />
        <div className="content">
          {/* <Sidebar /> */}
          <h1 style={{ textAlign: 'center', fontWeight: 'bold' }}>{newsFeedsTitle}</h1>
          <div>
            {boxes.map((box, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: this.getRandomColor(),
                  padding: '20px',
                  boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
                  borderRadius: '10px',
                  marginBottom: '20px', // Add margin bottom to create spacing between boxes
                }}
              >
                <h2 style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '10px' }}>{box.title}</h2>
                {box.images && box.images.length > 0 && (
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Images</h3>
                    {box.images.map((imagePath, imageIndex) => (
                      <img
                        key={imageIndex}
                        style={{
                          width: '100%',
                          maxWidth: '200px',
                          height: 'auto',
                          marginBottom: '10px',
                          marginRight: '10px',
                        }}
                        src={imagePath}
                        alt={`Image ${imageIndex + 1}`}
                      />
                    ))}
                  </div>
                )}
                {box.videos && box.videos.length > 0 && (
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Videos</h3>
                    {box.videos.map((videoPath, videoIndex) => (
                      <video
                        key={videoIndex}
                        style={{
                          width: '100%',
                          maxWidth: '200px',
                          height: 'auto',
                          marginBottom: '10px',
                          padding: '10px',
                        }}
                        controls
                      >
                        <source src={videoPath} type="video/mp4" />
                      </video>
                    ))}
                  </div>
                )}
                {box.description && (
                  <div>
                    <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Description</h3>
                    <p>{box.description}</p>
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
