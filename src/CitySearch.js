import React, { Component } from "react";
import "./App.css";
// VARS and FUNCS //////////
import { mockData } from "./mock-data";
import { extractLocations } from "./api";

class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
  };

  // defining event handler for input for change event
  handleInputChanged = (event) => {
    // take the value from input and update the state of query based on its value
    const value = event.target.value;
    // filter the state value of suggestions and use the result as the new value for the state
    // using this.props.locations within the func bc it will be passed from the App Component

    const locations = extractLocations(mockData);

    const suggestions = locations.filter((location) => {
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
    });
  };

  render() {
    return (
      <div className="CitySearch">
        <input
          type="text"
          className="city"
          value={this.state.query}
          // to detect any textual changes might have been made on the input

          onChange={this.handleInputChanged}
          placeholder="write a city name"
        />
        <ul className="suggestions">
          {this.state.suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li className="cityResult">
            <b className="seeAll">See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

export default CitySearch;
