import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { extractLocations, getEvents, checkToken, getAccessToken } from "./api";
import "./nprogress.css";
import { WarningAlert } from "./Alert";
import WelcomeScreen from './WelcomeScreen';
import {
  ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip
} from 'recharts';
import { mockData } from "./mock-data";
import EventGenre from "./EventGenre";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined,
    infoText: "",
  };

  async componentDidMount() {
    this.mounted = true;
    // warning alert for internet connection
    if (!navigator.onLine) {
      this.setState({
        infoText: "You are offline! Check your internet connection to see upcoming events"
      });
    }
    // else {
    //   return this.setState({
    //     events: [],
    //     locations: [],
    //     numberOfEvents: 32,
    //     showWelcomeScreen: undefined,
    //     infoText: ""
    //   });
    // }
    // get the token from localStorage
    const accessToken = localStorage.getItem("access_token");
    // verify the token
    // If there’s an error in the object returned by checkToken(), the variable isTokenValid will be assigned with the value false; otherwise, it will be true.
    // const isTokenValid = (await checkToken(accessToken)).error ? false : true;

    const tokenCheck = accessToken && (await checkToken(accessToken));
    const isTokenValid = !accessToken || tokenCheck.error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    // If code exists, or if token is valid, user is authorized
    const authorized = code || isTokenValid;

    this.setState({ showWelcomeScreen: !authorized });
    console.log("getEevents", code, accessToken);

    if (authorized && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events,
            locations: extractLocations(events),
          });
        }
      });
    }
  }

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

  // use componentWillUnmount to avoide the component to be unmounted before the API call is finished

  componentWillUnmount() {
    this.mounted = false;
  }

  // get the number of events in each city
  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    console.log(data);
    return data;
  };

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };


  render() {
    // assigned the state into a var 'events' to simplify the value of 'event' prop
    const { events, locations, showWelcomeScreen, numberOfEvents } = this.state;
    if (this.state.showWelcomeScreen === undefined) {
      return <div className="App"></div>;
    }
    console.log(events, "events inside the app");

    return (
      <div className="App">
        <button className="logout" onClick={this.onLoggedOut}>Log Out</button>
        <WarningAlert text={this.state.infoText} />

        <div>
          <h1>Meet Me There!</h1>
          <CitySearch
            locations={locations}
            updateEvents={(updatedLocation) => {
              this.updateEvents(updatedLocation);
            }}
          />
          <NumberOfEvents
            numberOfEvents={numberOfEvents}
            updateNumberOfEvents={(num) => this.updateNumberOfEvents(num)}
          />
        </div>
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <h4>Events in each city:</h4>
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#ffef8a" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <EventList events={events} />
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
