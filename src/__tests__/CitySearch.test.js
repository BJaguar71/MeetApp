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

  test("change state when text input changes/ when the user write a different city", () => {
    // the query state is set to Munich
    CitySearchWrapper.setState({
      query: "Berlin",
    });
    // the eventObject changes its value to berlin once the change event is called
    const eventObject = { target: { value: "Berlin" }};
    // simulate change to the city into the target value "Berlin"
    CitySearchWrapper.find(".city").simulate("change", eventObject);
    // comparing the value of query with "Berlin"
    expect(CitySearchWrapper.state("query")).toBe("Berlin");
  });

  test("render list of sugestions correctly", () => {
    // define a var containing different locations from the mockData events list/ extraction will be done by using the extractLocation func
    const locations = extractLocations(mockData);

    // set the suggestions state to full list of mock locations
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    // compare the number of rendered suggestions to the number of suggestions in the state of CitySearch
    // the rendered text is checked to ensure that it’s also been taken from state
    expect(CitySearchWrapper.find(".suggestions li")).toHaveLength(suggestions.length + 1);
    // loop through all the suggestions and compare the items in suggestions one by one
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find(".suggestions li").at(i).text()).toBe(suggestions[i]);
    }
  });

  test("suggestion list match the query when changed", () => {

    CitySearchWrapper.setState({ query: " ", suggestions: [] });

    CitySearchWrapper.find(".city").simulate("change", 
    {
      target: { value: "Berlin"},
    });

    const query = CitySearchWrapper.state("query");

    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });

    // use toEqual func to compare two arrays (complex data type)
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });

