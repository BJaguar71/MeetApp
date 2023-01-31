import React from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import Event from "./Event";
import NumberOfEvents from "./NumberOfEvents";

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <Event />
      <NumberOfEvents />
    </div>
  );
}

export default App;
