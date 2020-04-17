import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { GameCategoryContext } from "./contex/GameCategoryContext";
import { GameVariantContext } from "./contex/GameVariantContext";
import { AnimatePresence } from "framer-motion";
import buttonClick from "./sounds/buttonClick.mp3";
import UIfx from "uifx";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";

import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  useLocation,
} from "react-router-dom";
import GameMenu from "./components/gameMenu/GameMenu";
import GameModule from "./components/gameModule/GameModule";
import Result from "./components/resultPage/Result";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers/index";

//SOUDS
const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  const { points, questionsResult } = props;

  const [gameCategory, setGameCategory] = useState(null);
  const [gameVariant, setGameVariant] = useState(null);
  const [muteSounds, setMuteSounds] = useState(false);

  const handleMuteSounds = () => {
    if (!muteSounds) {
      clickSound.play();
    }
    setMuteSounds(!muteSounds);
  };

  const fullScreenCheck = () => {
    if (document.fullscreenElement) {
      window.screen.orientation.lock("portrait");
      return;
    } else {
      window.screen.orientation.lock("portrait");
      return document.documentElement.requestFullscreen();
    }
  };

  const gameCategoryValue = useMemo(() => ({ gameCategory, setGameCategory }), [
    gameCategory,
    setGameCategory,
  ]);

  const gameVariantValue = useMemo(() => ({ gameVariant, setGameVariant }), [
    gameVariant,
    setGameVariant,
  ]);

  const location = useLocation();

  return (
    <GameCategoryContext.Provider value={gameCategoryValue}>
      <GameVariantContext.Provider value={gameVariantValue}>
        <AnimatePresence>
          <Switch location={location} key={location.pathname}>
            <Route
              path="/result"
              render={(props) => (
                <Result
                  {...props}
                  points={points}
                  questionsResult={questionsResult}
                  fullScreenCheck={fullScreenCheck}
                />
              )}
            ></Route>
            <Route
              path="/gamemodule"
              render={(props) => (
                <GameModule {...props} fullScreenCheck={fullScreenCheck} />
              )}
            />
            <Route
              path="/gamemenu"
              crender={(props) => (
                <GameMenu {...props} fullScreenCheck={fullScreenCheck} />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => (
                <App
                  {...props}
                  handleMuteSounds={handleMuteSounds}
                  muteSounds={muteSounds}
                  fullScreenCheck={fullScreenCheck}
                />
              )}
            ></Route>
          </Switch>
        </AnimatePresence>
      </GameVariantContext.Provider>
    </GameCategoryContext.Provider>
  );
};

const mapStateToProps = (state) => ({
  points: state.points.points,
  questionsResult: state.questionsResult.questionsResult,
});

const RootWithAuth = withRouter(connect(mapStateToProps)(Root));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
