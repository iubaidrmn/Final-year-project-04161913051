import React, { Component } from 'react';

export default class CustomKit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      box1Label: '',
      box2Label: '',
      box3Label: '',
      box1Image: null,
      box2Image: null,
      box3Image: null,
    };
  }

  handleImageChange = (event, boxNumber) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        [`box${boxNumber}Image`]: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  handleLabelChange = (event, boxNumber) => {
    this.setState({
      [`box${boxNumber}Label`]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="box1">Box 1:</label>
          <input
            id="box1"
            type="file"
            accept="image/*"
            onChange={(event) => this.handleImageChange(event, 1)}
          />
          <input
            type="text"
            value={this.state.box1Label}
            onChange={(event) => this.handleLabelChange(event, 1)}
          />
          <button onClick={() => console.log('Update Box 1')}>Update</button>
          {this.state.box1Image && (
            <img src={this.state.box1Image} alt="Box 1" width="200" />
          )}
        </div>
        <div>
          <label htmlFor="box2">Box 2:</label>
          <input
            id="box2"
            type="file"
            accept="image/*"
            onChange={(event) => this.handleImageChange(event, 2)}
          />
          <input
            type="text"
            value={this.state.box2Label}
            onChange={(event) => this.handleLabelChange(event, 2)}
          />
          <button onClick={() => console.log('Update Box 2')}>Update</button>
          {this.state.box2Image && (
            <img src={this.state.box2Image} alt="Box 2" width="200" />
          )}
        </div>
        <div>
          <label htmlFor="box3">Box 3:</label>
          <input
            id="box3"
            type="file"
            accept="image/*"
            onChange={(event) => this.handleImageChange(event, 3)}
          />
          <input
            type="text"
            value={this.state.box3Label}
            onChange={(event) => this.handleLabelChange(event, 3)}
          />
          <button onClick={() => console.log('Update Box 3')}>Update</button>
          {this.state.box3Image && (
            <img src={this.state.box3Image} alt="Box 3" width="200" />
          )}
        </div>
      </div>
    );
  }
}
