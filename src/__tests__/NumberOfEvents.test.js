import React from "react";
import { shallow } from "enzyme";

// components
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render the component", () => {
    expect(NumberOfEventsWrapper.find(".NumberOfEvents")).toBeDefined();
  });

  test("render the input so that user can use it to specify the number of events to be shown", () => {
    expect(NumberOfEventsWrapper.find(".number")).toHaveLength(1);
  });

  test("render the number input correctly", () => {
    const numQuery = NumberOfEventsWrapper.state("numberOfEvents");
    expect(NumberOfEventsWrapper.find(".number").prop("value")).toBe(numQuery);
  });

  test("change state when number input changes/render the number of events that user especifies", () => {
    NumberOfEventsWrapper.setState({
      numberOfEvents: 10,
    });

    const numberOfEventsObject = {
      target: { value: 10,}
    };

    NumberOfEventsWrapper.find(".number").simulate("change", numberOfEventsObject);

    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(10);
  });
});