import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents updateNumberOfEvents={() => {}} />
    );
  });

  test("renders the component", () => {
    expect(NumberOfEventsWrapper).toBeDefined();
  });

  test("the input should have a default value of 32", () => {
    expect(NumberOfEventsWrapper.find("input.number").prop("type")).toBe("number");
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
  });

  test("the input should have the value given in the num prop", () => {
    const NumberOfEventsWrapperWithProp = shallow(
      <NumberOfEvents num={20} updateNumberOfEvents={() => {}} />
    );
    expect(NumberOfEventsWrapperWithProp.state("numberOfEvents")).toBe(20);
  });

  test("input should change on user input", () => {
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
    NumberOfEventsWrapper.find("input.number").simulate("change", {
      target: { value: 12 },
    });
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(12);
  });
});
