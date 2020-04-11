import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { GameCategoryContext } from "./components/contex/GameCategoryContext";
import { GameVariantContext } from "./components/contex/GameVariantContext";
import * as serviceWorker from "./serviceWorker";
import App from "./components/App";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GameMenu from "./components/menu/GameMenu";
import GameModule from "./components/GameModule";

const Root = props => {
  const [gameCategory, setGameCategory] = useState(null);
  const [gameVariant, setGameVariant] = useState(null);

  const gameCategoryValue = useMemo(() => ({ gameCategory, setGameCategory }), [
    gameCategory,
    setGameCategory
  ]);

  const gameVariantValue = useMemo(() => ({ gameVariant, setGameVariant }), [
    gameVariant,
    setGameVariant
  ]);
  return (
    <Router>
      <Switch>
        <GameCategoryContext.Provider value={gameCategoryValue}>
          <GameVariantContext.Provider value={gameVariantValue}>
            <Route exact path="/" render={props => <App {...props} />}></Route>
            <Route
              path="/gamemenu"
              render={props => <GameMenu {...props} />}
            ></Route>
            <Route
              path="/gamemodule"
              render={props => <GameModule {...props} />}
            ></Route>
          </GameVariantContext.Provider>
        </GameCategoryContext.Provider>
      </Switch>
    </Router>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
