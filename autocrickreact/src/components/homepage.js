import React, { Component } from 'react';
import image from '../assets/image.png';
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import HeaderBar from '../includes/header';
import Footer from '../includes/footer';
import Sidebar from '../includes/sidebar';

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
    };
  }

  handleSliderPress = () => {
    alert('Click successfully'); // Show an alert dialog
  };

  handleBoxClick = () => {
    alert('Click successfully'); // Show an alert dialog
  };

  handleLeftNavigation = () => {
    const { currentImageIndex } = this.state;
    const previousIndex = currentImageIndex > 0 ? currentImageIndex - 1 : 0;
    this.setState({ currentImageIndex: previousIndex });
  };

  handleRightNavigation = () => {
    const { currentImageIndex } = this.state;
    const sliderImages = [image1, image2, image3]; // Replace with your slider images
    const lastIndex = sliderImages.length - 1;
    const nextIndex = currentImageIndex < lastIndex ? currentImageIndex + 1 : lastIndex;
    this.setState({ currentImageIndex: nextIndex });
  };

  render() {
    const { currentImageIndex } = this.state;
    const sliderImages = [image1, image2, image3]; // Replace with your slider images

    const sliderImageSource = sliderImages[currentImageIndex];
    const roundPicSource = image;
    const recentTournamentsText = 'Recent Tournaments';
    const topBatsmanText = 'Top Players';

    const matchesPlayed = 10;
    const runs = 500;
    const rate = 80.5;

    return (
      <div>
        <HeaderBar />
        <div style={styles.container}>
          <Sidebar />
          <div style={styles.content}>
            <h2 style={styles.heading}>{recentTournamentsText}</h2>
            <div style={styles.sliderContainer}>
              <div style={styles.slider} onClick={this.handleSliderPress}>
                <img
                  style={styles.sliderImage}
                  src={sliderImageSource}
                  alt="Slider"
                  className="slider-image"
                />
              </div>
              <div style={styles.navigationContainer}>
                <button style={styles.navigationButton} onClick={this.handleLeftNavigation}>
                  &lt;
                </button>
                <button style={styles.navigationButton} onClick={this.handleRightNavigation}>
                  &gt;
                </button>
              </div>
            </div>
            <div style={styles.boxHeadingContainer}>
              <h3 style={styles.boxHeading}>{topBatsmanText}</h3>
            </div>
            <div style={styles.boxContainer}>
              <div style={styles.box} onClick={this.handleBoxClick}>
                <img style={styles.roundPic} src={roundPicSource} alt="Round Pic" />
                <p style={styles.text}>Matches Played: {matchesPlayed}</p>
                <p style={styles.text}>Runs: {runs}</p>
                <p style={styles.text}>Rate: {rate}</p>
              </div>
              <div style={styles.box} onClick={this.handleBoxClick}>
                <img style={styles.roundPic} src={roundPicSource} alt="Round Pic" />
                <p style={styles.text}>Matches Played: {matchesPlayed}</p>
                <p style={styles.text}>Runs: {runs}</p>
                <p style={styles.text}>Rate: {rate}</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
  },
  navigationMenu: {
    width: '200px',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  navigationList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  navigationItem: {
    marginBottom: '10px',
    cursor: 'pointer',
    borderBottom: '1px solid #ccc', // Add a gray border to the bottom of each navigation item
    padding: '10px', // Add some padding to the navigation items
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  sliderContainer: {
    position: 'relative',
    marginBottom: 10,
    textAlign: 'center',
  },
  slider: {
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    cursor: 'pointer',
    width: '70%', // Modify the width as per your preference
    margin: '0 auto', // Center the slider horizontally
    border: '1px solid #ccc', 
  },
  sliderImage: {
    width: '100%',
    height: 200,
    transition: 'transform 0.3s ease',
  },
  navigationContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    transform: 'translateY(-50%)',
  },
  navigationButton: {
    backgroundColor: '#ccc',
    color: '#fff',
    borderRadius: '50%',
    width: 40,
    height: 40,
    fontSize: 24,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  boxHeadingContainer: {
    alignItems: 'center',
    marginTop: 20,
    textAlign: 'center',
  },
  boxHeading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  boxContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around', // or 'space-evenly'
    marginTop: 10,
  },
  box: {
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
    padding: 20,
    cursor: 'pointer',
    border: '1px solid #ccc', 
  },
  roundPic: {
    width: 100,
    height: 100,
    borderRadius: '50%',
  },
  text: {
    marginTop: 5,
    fontSize: 16,
  },
};

export default Homepage;
