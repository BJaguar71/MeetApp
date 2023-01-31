import React, { Component } from "react";
import "./App.css";

class Event extends Component {
  state = { collapsed: true };
  toggleDetails = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };
  render() {
    return (
      <div>
        <h2 className="summary">{this.props.event.summary}</h2>
        <p className="start">{this.props.event.start.dateTime}</p>
        <p className="location">{`Location: ${this.props.event.location}`}</p>
        <button className="details-button" onClick={this.toggleDetails}>
          {this.state.collapsed ? "show" : "hide"} details
        </button>
        {!this.state.collapsed && (
          <div className="details">
            <h3 className="about">About this event:</h3>
            <a
              className="link"
              href={this.props.event.htmlLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              See details on Google Calendar
            </a>
            <p className="description">{this.props.event.description}</p>
          </div>
        )}
      </div>
    );
  }
}

export default Event;
