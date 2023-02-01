import React, { Component } from "react";
import "./App.css";
import { getEvents, extractLocations } from "./api";

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
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({
        events, locations: extractLocations(events)
      });
    });
  }

  componentWillUnmount() {
    this.mounted = false;
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
        <h3 className="numOfEvent-h3">Number of Events:</h3>
        <ul className="event suggestions"></ul>
      </div>
    );
  }
}

export default NumberOfEvents;