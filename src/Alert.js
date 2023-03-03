import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  // function for alert text style
  getStyle = () => {
    return {
      color: this.color,
    };
  }

  render() {
    return(
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// InfoAlert subclass 
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}





// exports here
export { InfoAlert };