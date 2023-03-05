import React, { Component } from "react";
import Event from "./Event";
import "./App.css";

class EventList extends Component {
  render() {
    const { events } = this.props;
    // rendering list of events using events props

    return (
      <ul className="EventList">
        {events.map((event) => (
          <li key={event.id}>
            <Event event={event} />
          </li>
        ))}
      </ul>
    );
  }
}

export default EventList;
