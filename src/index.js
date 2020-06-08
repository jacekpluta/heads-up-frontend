import React, { useState, useMemo, useEffect } from "react";
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
import Register from "./components/customCategories/Register";
import Login from "./components/customCategories/Login";
import CustomCategories from "./components/customCategories/CustomCategories";
import Category from "./components/customCategories/category/Category";
import PlayersCategories from "./components/customCategories/PlayersCategories";

import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { useCookies } from "react-cookie";
import { setUser } from "./actions";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const Root = (props) => {
  const { points, questionsResult, user, setUser, musicEntries } = props;

  const [gameCategory, setGameCategory] = useState(null);
  const [gameVariant, setGameVariant] = useState(null);
  const [muteSound, setMuteSound] = useState(false);
  const [pickedCategory, setPickedCategory] = useState(null);

  const [cookies, setCookies] = useCookies(["name"]);

  useEffect(() => {
    if (user) {
      setCookies("user", user, { path: "/" });
    }
  }, [user, setCookies]);

  useEffect(() => {
    if (cookies && cookies.user !== "null") {
      setUser(cookies.user);
    }
  }, [cookies, cookies.user, setUser]);

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

  const onPickedCategory = (category) => {
    setPickedCategory(category);
  };
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
              <Route path="/gamemodule" component={GameModule} />
              <Route path="/gamemenu" component={GameMenu} />
              <Route
                path="/login"
                render={(props) => <Login {...props} user={user} />}
              ></Route>
              <Route
                path="/register"
                render={(props) => <Register {...props} user={user}></Register>}
              ></Route>
              <Route
                path="/customCategories"
                render={(props) => (
                  <CustomCategories
                    {...props}
                    user={user}
                    onPickedCategory={onPickedCategory}
                  ></CustomCategories>
                )}
              ></Route>
              <Route
                path="/playersCategories"
                render={(props) => (
                  <PlayersCategories {...props}></PlayersCategories>
                )}
              ></Route>
              <Route
                path="/category"
                render={(props) => (
                  <Category
                    {...props}
                    user={user}
                    pickedCategory={pickedCategory}
                  ></Category>
                )}
              ></Route>

              <Route
                path="/"
                render={(props) => <App {...props} user={user}></App>}
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
  user: state.user.user,
  questionsResult: state.questionsResult.questionsResult,
});

const RootWithAuth = withRouter(connect(mapStateToProps, { setUser })(Root));

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
