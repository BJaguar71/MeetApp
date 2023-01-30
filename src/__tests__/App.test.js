// import react to could test React component
import React from "react";
import { shallow } from "enzyme";
// import component to test it
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";

// testing scope starts from here
describe("<App /> component", () => {
  // in order to shallow rendering the component:
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  })

  // firts scenario - show all events
  test("render list of all events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

