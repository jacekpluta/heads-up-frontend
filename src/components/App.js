import React, { useEffect, useState } from "react";

import { ParStyle } from "../styles/Layout";
import "../styles/styles.css";
import "../styles/styles.scss";

import { CircularProgress, Grid } from "@material-ui/core/";

import Header from "./mainPage/Header";
import Main from "./mainPage/Main";

import AnimalsTile from "../pic/animalsTile.jpg";
import MoviesTile from "../pic/moviesTile.jpg";
import GamesTile from "../pic/gamesTile.jpg";
import AnimeTile from "../pic/animeTile.jpg";

import animalList from "../lists/AnimalsList";
import axios from "axios";
import { motion } from "framer-motion";

import * as GamesApi from "../api/GamesApi";
import * as AnimeApi from "../api/AnimeApi";

import { useCookies } from "react-cookie";

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "100vw",
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 2,
};

function App() {
  const [filmList, setFilmList] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  const [check, setCheck] = useState(false);
  const [cookies, setCookies] = useCookies(["name"]);

  const [animeFetched, setAnimeFetched] = useState(false);

  const [filmsFetched, setFilmsFetched] = useState(false);
  const [gamesFetched, setGamesFetched] = useState(false);
  const [allFechted, setAllFechted] = useState(false);

  const [error, setError] = useState("");

  const gameCategoriesList = [
    {
      id: 0,
      name: "animals",
      gameMenuTitle: "Zwierzeta",
      questions: animalList,
      background: { backgroundImage: `url(${AnimalsTile})` },
      gameTile: { AnimalsTile },
      description: "Czy umiesz udawać słonia?",
    },
    {
      id: 1,
      name: "films",
      gameMenuTitle: "Filmy",
      questions:
        cookies && cookies.filmList && cookies.filmList[20]
          ? cookies.filmList
          : filmList, //checks if there is list of quesitons in cookies
      background: { backgroundImage: `url(${MoviesTile})` },
      gameTile: { MoviesTile },
      description: "Opisz swój ulubiony film!",
    },
    {
      id: 2,
      name: "games",
      gameMenuTitle: "Gry",
      questions:
        cookies && cookies.gamesList && cookies.gamesList[20]
          ? cookies.gamesList
          : gamesList, //checks if there is list of quesitons in cookies
      background: { backgroundImage: `url(${GamesTile})` },
      gameTile: { GamesTile },
      description: "GRY! GRY! GRY!",
    },
    {
      id: 3,
      name: "anime",
      gameMenuTitle: "Anime",
      questions:
        cookies && cookies.animeList && cookies.animeList[20]
          ? cookies.animeList
          : animeList, //checks if there is list of quesitons in cookies
      background: { backgroundImage: `url(${AnimeTile})` },
      gameTile: { AnimeTile },
      description: "Czy znasz wszystkie?",
    },
  ];

  //FETCH MOVIES TITLES FROM ANIME API
  async function fetchMyAPIFilms() {
    axios("https://parseapi.back4app.com/classes/Movie?keys=title", {
      headers: {
        "X-Parse-Application-Id": "xjK389lSZ70YgvRNe9fb1kd94z9IllRKqOrQIa6l",
        "X-Parse-Master-Key": "7wHPVDC4MkHR7f6a3gUcYqu8rb8XfVt0GY0gkAs0",
      },
    })
      .then((response) => {
        Object.entries(response.data.results).map(([key, value]) =>
          setFilmList((filmList) => [
            ...filmList,
            response.data.results[key].title,
          ])
        );
      })
      .then(() => {
        setFilmsFetched(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  //FETCH GAMES QUESTIONS FROM ANIME API
  async function fetchMyAPIGames() {
    Promise.all([
      GamesApi.games(),
      GamesApi.genres(),
      GamesApi.tags(),
      GamesApi.developers(),
      GamesApi.publishers(),
    ])
      .then((responses) => {
        responses.forEach((response) => {
          if (response) {
            Object.entries(response.data.results).map(([key, value]) => {
              setGamesList((gamesList) => [...gamesList, value.name]);
            });
          }
        });
      })
      .then(() => {
        setGamesFetched(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  //FETCH ANIME QUESTIONS FROM ANIME API
  async function fetchMyAPIAnime() {
    Promise.all([
      AnimeApi.animeApiTop020(),
      AnimeApi.animeApiTop2040(),
      AnimeApi.animeApiTop4060(),
      AnimeApi.animeApiTopCharacters020(),
      AnimeApi.animeApiTopCharacters2040(),
      AnimeApi.animeApiTopCharacters4060(),
    ])
      .then((responses) => {
        responses.forEach((response) => {
          Object.entries(response.data.data).map(([key, value]) => {
            if (value.type === "anime") {
              setAnimeList((animeList) => [
                ...animeList,
                value.attributes.titles.en_jp,
              ]);
            } else if (value.type === "characters") {
              setAnimeList((animeList) => [
                ...animeList,
                value.attributes.name,
              ]);
            }
          });
        });
      })
      .then(() => {
        setAnimeFetched(true);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    if (animeFetched && gamesFetched && filmsFetched) {
      setAllFechted(true);
      callAPI();
    }
  }, [animeFetched, gamesFetched, filmsFetched]);

  //set coockies if they are not set after all data was fetched
  useEffect(() => {
    if (allFechted) {
      if (!cookies.filmList) {
        setCookies("filmList", filmList, { path: "/" });
      }
      if (!cookies.animeList) {
        setCookies("animeList", animeList, { path: "/" });
      }
      if (!cookies.gamesList) {
        setCookies("gamesList", gamesList, { path: "/" });
      }
    }
  }, [allFechted]);

  //fetch data for categories if there is not data in coockies for them
  useEffect(() => {
    if (cookies.filmList && cookies.filmList[20]) {
      setFilmsFetched(true);
    } else {
      fetchMyAPIFilms();
    }

    if (cookies.animeList && cookies.animeList[20]) {
      setAnimeFetched(true);
    } else {
      fetchMyAPIAnime();
    }

    if (cookies.gamesList && cookies.gamesList[20]) {
      setGamesFetched(true);
    } else {
      fetchMyAPIGames();
    }
  }, []);

  // useEffect(() => {
  //   const page = document.documentElement;
  //   if (page.requestFullscreen) {
  //     page.requestFullscreen();
  //   } else if (page.mozRequestFullScreen) {
  //     page.mozRequestFullScreen();
  //   } else if (page.webkitRequestFullscreen) {
  //     page.webkitRequestFullscreen();
  //   } else if (page.msRequestFullscreen) {
  //     page.msRequestFullscreen();
  //   }
  // }, []);

  //checks if the data has been fetched, if not then reload page
  useEffect(() => {
    if (check) {
      if (!allFechted) {
        window.location.reload();
      }
    }
  }, [check, allFechted]);

  const renderLoading = () => {
    //checks if data was fetched in 4 seconds of loading screen
    setTimeout(() => {
      setCheck(true);
    }, 4000);

    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{
          background: "linearGradient(180deg, #013064, #1255a0)",
        }}
      >
        <ParStyle style={{ fontSize: "5vw", top: "40%" }}>
          {error ? "Please refresh the game" : "Loading the game"}
        </ParStyle>
        <ParStyle>
          {!error ? <CircularProgress thickness={5} color="secondary" /> : ""}
        </ParStyle>
      </Grid>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      window.screen.orientation.lock("portrait");
    }, 200);
  }, []);

  if (allFechted) {
    return (
      <motion.div
        className="App"
        variants={pageVariants}
        transition={pageTransition}
        initial="initial"
        animate="in"
        exit="out"
      >
        <Header />
        <Main
          allFechted={allFechted}
          gameCategoriesList={gameCategoriesList}
        ></Main>
      </motion.div>
    );
  } else
    return (
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{
          background: "linearGradient(180deg, #013064, #1255a0)",
        }}
      >
        {renderLoading()}
      </Grid>
    );
}

export default App;
