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

  test("render a list of suggestions", () => {
    expect(CitySearchWrapper.find(".suggestions")).toHaveLength(1);
  });

  test("render text input correctly", () => {
    // define and set the query element from CitySearch state
    // the query that user types into the textbox
    const query = CitySearchWrapper.state("query");
    // compare the value prop of each elemet with "city" class, found within CitySearch Component
    // it will also check if the input field's value prop is equal to the query state in CitySearch
    expect(CitySearchWrapper.find(".city").prop("value")).toBe(query);
  });

