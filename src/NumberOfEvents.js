import React, { Component } from "react";
import "./App.css";

import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  // initial state when user doesn't specify the number of events

  state = {
    numberOfEvents: 32,
    infoText: "" 
  };
  // when user chnages the number of events to be shown
  // we need to have function which handle the changing value of the input
  changeNum = (value) => {
    if (value <= 0 || value > 32) {
      this.setState({
        numberOfEvents: value,
        infoText: "Please choose a number between 1 and 32." 
      });
    } else {
      return this.setState({
        numberOfEvents: value,
        infoText: ""
      });
    }
    // if (0 < value && value <= 32) {
    //   this.setState({ numberOfEvents: value });
    //   this.props.updateNumberOfEvents(value);
    // }
  };

  componentDidMount() {
    this.setState({ 
      numberOfEvents: this.props.num || 32,
      infoText: ""
    });
  }

  render() {
    const { numberOfEvents } = this.state;

    return (
      <div className="NumberOfEvents">
        <label>
          <p className="numberOfCity">Number of events</p>
          <input
            className="number"
            type="number"
            value={numberOfEvents}
            onChange={(event) => this.changeNum(event.target.value)}
          ></input>
          <ErrorAlert text={this.state.infoText}/>
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
