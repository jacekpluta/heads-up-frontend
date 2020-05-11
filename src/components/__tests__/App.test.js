import * as React from "react";
import { mount } from "enzyme";
import App from "../App";
import Header from "../mainPage/Header";
import Main from "../mainPage/Main";
import { CircularProgress } from "@material-ui/core/";

import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

// beforeEach(() => {
//   wrapper = shallow(<App />);
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

it("it shows a loader when !allFechted", () => {
  const wrapper = shallow(<App />);
  console.log(wrapper);
  // const loadingIndicator = wrapper.find(CircularProgress);
  // expect(loadingIndicator).toHaveLength(1);
});

// it("it should render Header component", async () => {
//   expect(wrapper.find(Header)).toBeTruthy();
// });

// it("it should render Main component", async () => {
//   expect(wrapper.find(Main)).toBeTruthy();
// });

// Change the viewport to 500px.
// global.innerWidth = 300;
// global.innerHeight = 600;

// Trigger the window resize event.
// global.dispatchEvent(new Event("resize"));
// console.log(wrapped.find(CircularProgress));
