import React, { Component } from "react";
import HeaderBar from "../includes/header";
import Footer from "../includes/footer";

export default class CustomKit extends Component {
  constructor(props) {
    super(props);
    this.fileInputRefs = [
      React.createRef(), // Ref for the first box
      React.createRef(), // Ref for the second box
      React.createRef(), // Ref for the third box
      React.createRef(), // Ref for the fourth box
      React.createRef(), // Ref for the fifth box
      React.createRef(), // Ref for the sixth box
    ];
    this.state = {
      images: [null, null, null, null, null, null], // Initial images state for each box
      texts: [
        "Shirt Front",
        "Shirt Back",
        "Trouser Front",
        "Trouser Side",
        "Shoes",
        "Cap",
      ], // Texts for each box
      teamName: "Shaheen Eleven", // Team name stored in a variable
      teamId: "12345", // Team ID stored in a variable
    };
  }

  componentDidMount() {
    // Retrieve images from local storage if available
    const storedImages = localStorage.getItem("customKitImages");
    if (storedImages) {
      this.setState({ images: JSON.parse(storedImages) });
    }
  }

  handleImageChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedImages = [...this.state.images];
        updatedImages[index] = reader.result;
        this.setState({ images: updatedImages });
        localStorage.setItem("customKitImages", JSON.stringify(updatedImages));
      };
      reader.readAsDataURL(file);
    }
  };

  handleUpdateClick = (index) => {
    // Reset the image state for the clicked box to allow selecting a new image
    const updatedImages = [...this.state.images];
    updatedImages[index] = null;
    this.setState({ images: updatedImages });
    localStorage.setItem("customKitImages", JSON.stringify(updatedImages));

    // Trigger click on the file input of the clicked box when the "Update" button is clicked
    if (this.fileInputRefs[index].current) {
      this.fileInputRefs[index].current.click();
    }
  };

  render() {
    const { images, texts, teamName, teamId } = this.state;

    return (
      <div>
        <HeaderBar />
        <div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            <h1>{teamName}</h1>
            <p>ID: {teamId}</p>
          </div>
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "100%",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "350px",
                  padding: "20px",
                  marginLeft: "20px",
                  marginRight: "20px",
                  borderRadius: "10px",
                  border: "1px solid #000",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                {images[index] && (
                  <img
                    src={images[index]}
                    alt={`Selected Image ${index + 1}`}
                    style={{
                      width: "200px",
                      height: "200px",
                      objectFit: "contain",
                    }}
                  />
                )}
                {!images[index] && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => this.handleImageChange(event, index)}
                      ref={this.fileInputRefs[index]} // Attach the ref to the file input
                      style={{ display: "none" }} // Hide the file input
                    />
                    <p>No image selected</p>
                  </div>
                )}
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: "18px",
                      border: "2px solid rgba(0, 0, 0, 0.2)",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    {texts[index]}
                  </p>
                  <button
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#f0f0f0",
                      border: "1px solid #000", // Add border style here
                      borderRadius: "5px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      cursor: "pointer",
                    }}
                    onClick={() => this.handleUpdateClick(index)} // Handle the click event for the specific box
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
