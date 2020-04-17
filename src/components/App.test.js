import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ExpansionPanelActions } from "@material-ui/core";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);

  expect(div.innerHTML).toContain("Gra działa tylko na urządzeniach mobilnych");
  ReactDOM.unmountComponentAtNode(div);
});
