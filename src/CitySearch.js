// export default CitySearch;
import React, { Component } from "react";
import "./App.css";
// VARS and FUNCS //////////
import { mockData } from "./mock-data";
import { extractLocations } from "./api";

import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
  };

  // defining event handler for input for change event
  handleInputChanged = (event) => {
    // take the value from input and update the state of query based on its value
    const value = event.target.value;
    // filter the state value of suggestions and use the result as the new value for the state
    // using this.props.locations within the func bc it will be passed from the App Component

   const locations = extractLocations(mockData);

    this.setState({showSuggestions: true});
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    this.setState({
      query: value,
      suggestions,
    });
  };

  // new function to use in the click event handler of the suggestion list item
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      // set the state to false, whenever an item is clicked
      showSuggestions: false,
    });
    //  call the updateEvents method here
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className="CitySearch">
        <p className="chooseCity">City</p>
        <input
          type="text"
          className="city"
          value={this.state.query}
          // to detect any textual changes might have been made on the input

          onChange={this.handleInputChanged}
          onFocus={() => {
            this.setState({ showSuggestions: true });
          }}
          placeholder="write a city name"
        />
        <ul
          className="suggestions"
          // if showSuggestions is true the list will be visible otherwise style won't have display: "none" so the list won't become visible
          style={this.state.showSuggestions ? {} : { display: "none" }}
        >
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li
            className="cityResult"
            onClick={() => this.handleItemClicked("all")}
          >
            <b className="seeAll">See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
