import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { CircularProgress, Grid } from "@material-ui/core/";

import Header from "./Header";
import Main from "./Main";

import AnimalsTile from "../pic/animalsTile.jpg";
import MoviesTile from "../pic/moviesTile.jpg";
import GamesTile from "../pic/gamesTile.jpg";
import AnimeTile from "../pic/animeTile.jpg";

import { ParStyle, BlueBackgroundStyle } from "../styles/Layout";
import { isBrowser } from "react-device-detect";
import animalList from "./lists/AnimalsList";
import axios from "axios";
import { motion } from "framer-motion";

function App() {
  const [filmList, setFilmList] = useState([]);
  const [gameList, setGameList] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  const [animeFetched, setAnimeFetched] = useState(false);
  const [filmsFetched, setFilmsFetched] = useState(false);
  const [gamesFetched, setGamesFetched] = useState(false);
  const [allFechted, setAllFechted] = useState(false);
  const [muteSounds, setMuteSounds] = useState(false);

  const gameVariantsList = [
    {
      id: 0,
      name: "animals",
      gameMenuTitle: "Zwierzeta",
      questions: animalList,
      background: { backgroundImage: `url(${AnimalsTile})` },
      gameTile: { AnimalsTile },
      description: "Czy umiesz udawać słonia? ",
    },
    {
      id: 1,
      name: "films",
      gameMenuTitle: "Filmy",
      questions: filmList,
      background: { backgroundImage: `url(${MoviesTile})` },
      gameTile: { MoviesTile },
      description: "aaa",
    },
    {
      id: 2,
      name: "games",
      gameMenuTitle: "Gry",
      questions: gameList,
      background: { backgroundImage: `url(${GamesTile})` },
      gameTile: { GamesTile },
      description: "aaa",
    },
    {
      id: 3,
      name: "anime",
      gameMenuTitle: "Anime",
      questions: animeList,
      background: { backgroundImage: `url(${AnimeTile})` },
      gameTile: { AnimeTile },
      description: "aaa",
    },
  ];

  async function fetchMyAPIFilms() {
    axios({
      method: "GET",
      url:
        "https://api.themoviedb.org/3/movie/popular?api_key=01e57b363d38e654e9afbd273dce30c3&language=en-US&page=1",
    })
      .then((response) => {
        Object.entries(response.data.results).map(([key, value]) =>
          setFilmList((filmList) => [
            ...filmList,
            response.data.results[key].name,
          ])
        );
      })
      .then(() => {
        setFilmsFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchMyAPIGames() {
    axios({
      method: "GET",
      url: "https://rawg-video-games-database.p.rapidapi.com/games",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4",
      },
    })
      .then((response) => {
        Object.entries(response.data.results).map(([key, value]) =>
          setGameList((gameList) => [
            ...gameList,
            response.data.results[key].name,
          ])
        );
      })
      .then(() => {
        setGamesFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function fetchMyAPIAnime() {
    axios({
      method: "GET",
      url: "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-type": "application/vnd.api+json",
        links: {
          first:
            "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=1",
        },
      },
    })
      .then((response) => {
        Object.entries(response.data.data).map(([key, value]) =>
          setAnimeList((animeList) => [
            ...animeList,
            response.data.data[key].attributes.titles.en_jp,
          ])
        );
      })
      .then(() => {
        setAnimeFetched(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleMuteSounds = () => {
    setMuteSounds(!muteSounds);
  };

  useEffect(() => {
    if (!isBrowser) {
      window.screen.orientation.lock("landscape");
      // fetchMyAPIFilms();
      // fetchMyAPIAnime();
      // fetchMyAPIGames();
    }
  }, []);

  useEffect(() => {
    if (animeFetched && gamesFetched && filmsFetched) {
      setAllFechted(true);
    }
  }, [animeFetched, gamesFetched, filmsFetched]);

  const pageTransition = {
    inModule: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    outModule: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  if (isBrowser) {
    return (
      <BlueBackgroundStyle>
        <ParStyle style={{ fontSize: "5vw" }}>
          Gra działa tylko na urządzeniach mobilnych
        </ParStyle>
      </BlueBackgroundStyle>
    );
  } else if (!allFechted) {
    return (
      <motion.div
        className="App"
        variants={pageTransition}
        initial={"outModule"}
        animate={"inModule"}
        exit={"outModule"}
      >
        <Header handleMuteSounds={handleMuteSounds} />

        <Main
          allFechted={allFechted}
          gameVariantsList={gameVariantsList}
          muteSounds={muteSounds}
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
          minHeight: "100vh",
        }}
      >
        <CircularProgress thickness={5} color="secondary" />
      </Grid>
    );
}

export default App;
