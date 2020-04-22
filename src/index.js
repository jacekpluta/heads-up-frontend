import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { GameCategoryContext } from "./contex/GameCategoryContext";
import { GameVariantContext } from "./contex/GameVariantContext";
import { MuteSoundContext } from "./contex/MuteSoundContext";
import { AnimatePresence } from "framer-motion";

import { CookiesProvider } from "react-cookie";

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

const store = createStore(rootReducer, composeWithDevTools());

const Root = (props) => {
  const { points, questionsResult } = props;

  const [gameCategory, setGameCategory] = useState(null);
  const [gameVariant, setGameVariant] = useState(null);
  const [muteSound, setMuteSound] = useState(false);

  const muteSoundValue = useMemo(() => ({ muteSound, setMuteSound }), [
    muteSound,
    setMuteSound,
  ]);

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
        <MuteSoundContext.Provider value={muteSoundValue}>
          <AnimatePresence>
            <Switch location={location} key={location.pathname}>
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
              <Route
                path="/gamemodule"
                render={(props) => <GameModule {...props} />}
              />
              <Route
                path="/gamemenu"
                render={(props) => <GameMenu {...props} />}
              />
              <Route
                exact
                path="/"
                render={(props) => <App {...props} />}
              ></Route>
            </Switch>
          </AnimatePresence>
        </MuteSoundContext.Provider>
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
  <CookiesProvider>
    <Provider store={store}>
      <BrowserRouter>
        <RootWithAuth />
      </BrowserRouter>
    </Provider>
  </CookiesProvider>,
  document.getElementById("root")
);

serviceWorker.register();
