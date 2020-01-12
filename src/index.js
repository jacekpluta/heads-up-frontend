import React from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameMenu from "./components/menu/GameMenu";
import GameModule from "./components/GameModule";
const Root = props => (
  <Router>
    <Switch>
      <Route exact path="/" component={App}></Route>
      <Route path="/gamemenu" component={GameMenu}></Route>
      <Route path="/gamemodule" component={GameModule}></Route>
    </Switch>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
