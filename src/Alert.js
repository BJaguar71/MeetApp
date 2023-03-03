import React, { Component } from "react";
import "./App.css";

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

// InfoAlert subclass to be added to the CirtSearch component's render method
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#004e75';
  }
}

// ErrorAlert to be added to the NumberOfEvents component's render method
class ErrorAlert extends Alert {
  constructor(props){
    super(props);
    this.color = "#971902";
  }
}



// exports here
export { InfoAlert };
export { ErrorAlert };