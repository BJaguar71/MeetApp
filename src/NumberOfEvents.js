import React, { Component } from "react";
import "./App.css";

class NumberOfEvents extends Component {
  // initial state when user doesn't specify the number of events

  state = {
    numberOfEvents: 32,
  };
  // when user chnages the number of events to be shown
  // we need to have function which handle the changing value of the input
  changeNum = (value) => {
    this.setState({ numberOfEvents: value });
    this.props.updateNumberOfEvents(value);
  };

  componentDidMount() {
    this.setState({ numberOfEvents: this.props.num || 32 });
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
        </label>
      </div>
    );
  }
}

export default NumberOfEvents;
