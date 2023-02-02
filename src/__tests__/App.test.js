// import react to could test React component
import React from "react";
import { shallow, mount } from "enzyme";
// import component to test it
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import { mockData } from "../mock-data";
import { extractLocations, getEvents } from "../api";

// unit testing scope starts from here:
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

  // second scenario / seacrh for a city
  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});



// integration testing begins from here:
describe("<App /> integration", () => {

  // test 1
  test("App passes 'events' state as a prop to its child EventList", () => {

    const AppWrapper = mount(<App />);
  
    // define the state of the events prop
    const AppEventsState = AppWrapper.state("events");

    // check state of events prop not to be undefined
    expect(AppEventsState).not.toEqual(undefined);
    // compare the state of App's events with EventList's prop to ensure it's been passed correctly / checks if the AppWrapper's child, EventList has the prop 'events' equal to AppEventsState
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);

    // unmount the component
    AppWrapper.unmount();
  });

  // test 2:
  test("App passes 'locations' state as prop to its child CitySearch", () => {

    const AppWrapper = mount(<App />);

    // define the state of locations prop
    const AppLocationsState = AppWrapper.state("locations");
    // check whether App's prop (locations) not to be undefined
    expect(AppLocationsState).not.toEqual(undefined);

    // comparing the two states to be equal 
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  //  test 3: 
  // add async functions 
  test("get the list of events matching the city selected by user", async () => {

    // mount the component
    const AppWrapper = mount(<App />);

    // grab the CitySearch child of the App
    const CitySearchWrapper = AppWrapper.find(CitySearch);

    // extract the locations from mockData file
    const locations = extractLocations(mockData);

    // set the CitySearch's "suggestions" state to have all cities 
    CitySearchWrapper.setState({ suggestions: locations });

    // define the state of suggestions prop 
    const suggestions = CitySearchWrapper.state('suggestions');

    // define a variable to hold the index of the selected city from the suggestion array 
    // the code bellow will return random suggestions between 0 and the length.suggestions-1
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));

    // return the actual suggestions and store it into a var
    const selectedCity = suggestions[selectedIndex];

    // mimick click by handleItemClicked method from CitySearch by calling instance on it and then call the functions the component has directly and pass the selectedCity to it
    // why await: it will fetch the full list of events before filtering them to match the selected city (asyn code)
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);

    // get all events from api asynchronously 
    // getEvents is defined inside api.js
    const allEvents = await getEvents();

    // store all events that have been filtered with selected location/city to find events with same location into a var
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);

    // compare whether th state of "events" takes the same array as the events resulted drom filtering process
    expect(AppWrapper.state("events")).toEqual(eventsToShow);

    AppWrapper.unmount();
  });

  // test 4
  test("get the list of all events when user selects 'see all cities'", async () => {
    const AppWrapper = mount(<App />);

    // grab the child element of CitySearch with the class "suggestion li"
    const suggestionsItems = AppWrapper.find(CitySearch).find(".suggestions li");

    // simulate click on the grabed child from above (last list item "see all cities")
    await suggestionsItems.at(suggestionsItems.length - 1).simulate("click");

    // get all events from api asynchronously 
    const allEvents = await getEvents();

    // compare if the state of "events" is equal to allEvents
    expect(AppWrapper.state("events")).toEqual(allEvents);
    
    AppWrapper.unmount();
  });
  
});