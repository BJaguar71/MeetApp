import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";


class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
    infoText: ""
  };

  updateEvents = (location) => {
    getEvents().then((events) => {
      //  filteres events that their location is equal to selected location

      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      //  set the "event" state to the the array recieved from the code above

      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents),
      });
    });
  };

  updateNumberOfEvents(number) {
    this.setState({
      numberOfEvents: number,
    });
  }
  // create componentDidMount to make API call and save the initial data to state:

  async componentDidMount() {
    if(navigator.onLine === false) {
      this.setState({
        infoText: "You are offline! Check your internet connection to see upcoming events"
      });
    }
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
    });
  }
  // use componentWillUnmount to avoide the component to be unmounted before the API call is finished

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    // assigned the state into a var 'events' to simplify the value of 'event' prop
    const { events, locations } = this.state;

    return (
      <div className="App">
        <WarningAlert text={this.state.infoText}/>
        <div className="filters">
          <CitySearch
            locations={locations}
            updateEvents={(updatedLocation) => {
              this.updateEvents(updatedLocation);
            }}
          />
          <NumberOfEvents
            num={this.state.numberOfEvents}
            updateNumberOfEvents={(num) => this.updateNumberOfEvents(num)}
          />
        </div>
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
