import React from "react";

export default class Footer extends React.Component {
  render() {
    const currentYear = new Date().getFullYear();
    return (
      <div className="footer">
        <div className="year-info">
          © {currentYear} AutoCrick. All rights reserved.
        </div>
      </div>
    );
  }
}
