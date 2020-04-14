import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { GameCategoryContext } from "./components/contex/GameCategoryContext";
import { GameVariantContext } from "./components/contex/GameVariantContext";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import GameMenu from "./components/menu/GameMenu";
import GameModule from "./components/GameModule";
import Result from "./components/Result";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  const { points, questionsResult } = props;

  const [gameCategory, setGameCategory] = useState(null);
  const [gameVariant, setGameVariant] = useState(null);

  const gameCategoryValue = useMemo(() => ({ gameCategory, setGameCategory }), [
    gameCategory,
    setGameCategory,
  ]);

  const gameVariantValue = useMemo(() => ({ gameVariant, setGameVariant }), [
    gameVariant,
    setGameVariant,
  ]);

  return (
    <Switch>
      <GameCategoryContext.Provider value={gameCategoryValue}>
        <GameVariantContext.Provider value={gameVariantValue}>
          <Route exact path="/" render={(props) => <App {...props} />}></Route>
          <Route
            path="/gamemenu"
            render={(props) => <GameMenu {...props} />}
          ></Route>
          <Route
            path="/gamemodule"
            render={(props) => <GameModule {...props} />}
          ></Route>
          <Route
            path="/result"
            render={(props) => (
              <Result
                {...props}
                points={points}
                questionsResult={questionsResult}
              />
            )}
          ></Route>
        </GameVariantContext.Provider>
      </GameCategoryContext.Provider>
    </Switch>
  );
};

const mapStateToProps = (state) => ({
  points: state.points.points,
  questionsResult: state.questionsResult.questionsResult,
});

const RootWithAuth = withRouter(connect(mapStateToProps)(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
