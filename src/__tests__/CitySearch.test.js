import React from "react";
import { shallow } from "enzyme";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations } from "../api";


describe("<CitySearch /> component", () =>{
  let locations, CitySearchWrapper; 
  beforeAll(() => {
    // define a superset of all locations to be used to filter locations against query to set the suggestions state
    let locations = extractLocations(mockData);
    CitySearchWrapper = shallow(<CitySearch locations={locations} />);
  });

// test starts from here: 
  test("render text input", () => {
    expect(CitySearchWrapper.find(".city")).toHaveLength(1);
  });

