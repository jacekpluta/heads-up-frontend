import React, { Component } from "react";

import Main from "../mainPage/Main";

import Box from "../mainPage/Box";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

const gameCategoriesList = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Main gameCategoriesList={gameCategoriesList} />);
});

it("should render 4 box components", () => {
  expect(wrapper.find(Box).length).toEqual(4);
});
