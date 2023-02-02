import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import { extractLocations, getEvents } from "./api";
import "../src/nprogress.css";


class App extends Component {
  // creating an state
  state = {
    events: [],
    locations: [],
  }


  // create componentDidMount to make API call and save the initial data to state: 
  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      this.setState({
        events, locations: extractLocations(events)
      });
    });
  }

  // use componentWillUnmount to avoide the component to be unmounted before the API call is finished
  componentWillUnmount() {
    this.mounted = false;
  }

  // create a method that changes the "events" state / pass it to the CitySearch / call it inside the handleItemClicked
  updateEvents = (location) => {
    getEvents().then((events) => {
      //  filteres events that their location is equal to selected location
      const locationEvents = (location === "all") ? events : events.filter((event) => event.location === location);
      //  set the "event" state to the the array recieved from the code above
      this.setState({
        events: locationEvents
      });
    });
  };

  render() {
    // assigned the state into a var 'events' to simplify the value of 'event' prop 
    const { events, locations } = this.state;
    return (
      <div className="App">
        <CitySearch locations={locations} updateEvents={this.updateEvents}/>
        <EventList events={events} />
      </div>
    );
  }
}

export default App;
