import React from "react";
import { Route } from "react-router-dom";
import GameModule from "./components/GameModule";
import Main from "./components/Main";
const Routes = () => {
  return (
    <div>
      <Route exact path="/" component={Main} />
      <Route path="/GameModule" component={GameModule} />
    </div>
  );
};

export default Routes;
