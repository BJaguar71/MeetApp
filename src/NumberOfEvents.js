import React, { Component } from "react";

class NumberOfEvents extends Component {
  // initial state when user doesn't specify the number of events
  constructor() {
    super();
    this.state = {
      numberOfEvents: 32,
    };
  }

  // when user chnages the number of events to be shown
  componentDidMount() {
    // I don't know what to write here
  }

  render() {
    return (
      <div className="NumberOfEvents">
        <input
          className="number"
          type="number"
          onChange={(e) => this.setState({ numberOfEvents: e.target.value })}
          value={this.state.numberOfEvents}
        />
        <h3>Number of Events:</h3>
        <ul className="event suggestions"></ul>
      </div>
    );
  }
}

export default NumberOfEvents;
