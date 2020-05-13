import React, { Component } from "react";
import TestRenderer from "react-test-renderer";

import App from "../App";
import Header from "../mainPage/Header";
import Main from "../mainPage/Main";

import Box from "../mainPage/Box";
import { HeaderStyle } from "../../styles/Layout";

import { MemoryRouter } from "react-router-dom";
import * as deviceDetect from "react-device-detect";
import { GameCategoryContext } from "../../contex/GameCategoryContext";
import { MuteSoundContext } from "../../contex/MuteSoundContext";

import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

deviceDetect.isMobile = true;

let wrapper;

beforeEach(() => {
  wrapper = shallow(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

afterEach(() => {});

// it("should render itself", () => {
//   const gameCategoryValue = {
//     id: 0,
//     name: "animals",
//     gameMenuTitle: "Zwierzeta",
//     questions: [],
//     background: "",
//     gameTile: "",
//     description: "Czy umiesz udawać słonia?",
//   };
// });

it("render correctly text component", () => {
  const gameCategoryValue = {
    id: 0,
    name: "animals",
    gameMenuTitle: "Zwierzeta",
    questions: [],
    background: "",
    gameTile: "",
    description: "Czy umiesz udawać słonia?",
  };

  const TextInputComponent = TestRenderer.create(
    <MuteSoundContext.Provider value={false}>
      <GameCategoryContext.Provider value={gameCategoryValue}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </GameCategoryContext.Provider>
    </MuteSoundContext.Provider>
  ).toJSON();
  expect(TextInputComponent).toMatchSnapshot();
});

//   <GameCategoryContext.Provider value={gameCategoryValue}>
//
// <MuteSoundContext.Provider value={false}>
