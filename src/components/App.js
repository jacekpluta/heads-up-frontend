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
import MusicTile from "../pic/musicTile.jpg";

import animalList from "../lists/AnimalsList";

import { motion } from "framer-motion";

import * as GamesApi from "../webApi/GamesApi";
import * as AnimeApi from "../webApi/AnimeApi";

import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

import { clickSound } from "./Sounds";

import { connect } from "react-redux";

import { fetchMusicEntries, fetchAlcoholEntries } from "../actions/index";
import { default as axiosObservable } from "axios-observable";
import axios from "axios";

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
  duration: 1,
};

const buttonStyleMyCat = {
  position: "absolute",
  right: 0,
  maxWidth: "50%",
  maxHeight: "40px",
  minWidth: "50%",
  minHeight: "40px",
  borderColor: "#3e50b4",
  borderStyle: "ridge",
  borderWidth: "4px",
};

const buttonStyleAllCat = {
  position: "absolute",
  left: 0,
  maxWidth: "50%",
  maxHeight: "40px",
  minWidth: "50%",
  minHeight: "40px",
  borderColor: "#f40056",
  borderStyle: "ridge",
  borderWidth: "4px",
};

function App(props) {
  const [filmList, setFilmList] = useState([]);
  const [gamesList, setGamesList] = useState([]);
  const [animeList, setAnimeList] = useState([]);

  const [check, setCheck] = useState(false);

  const [animeFetched, setAnimeFetched] = useState(false);
  const [filmsFetched, setFilmsFetched] = useState(false);
  const [gamesFetched, setGamesFetched] = useState(false);
  const [musicFetched, setMusicFetched] = useState(false);

  const [allFechted, setAllFechted] = useState(false);

  const [error, setError] = useState("");

  const {
    musicList,

    fetchMusicEntries,
    fetchAlcoholEntries,
  } = props;

  let history = useHistory();

  useEffect(() => {
    fetchAlcoholEntries();
  }, []);

  // const promise = new Promise((resolve) => {
  //   console.log("- Executing promise");
  //   resolve();
  // });

  // const observable = new Observable((observer) => {
  //   console.log("- Executing observable");
  //   observer.next();
  // });

  // const promise = new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log("Promise Async after 2 sec task done");
  //     resolve();
  //   }, 2000);
  // });
  // promise.then(() => console.log("Promise Handler"));
  // Oops, can't prevent handler from being executed anymore.

  // const observable = new Observable((observer) => {
  //   setTimeout(() => {
  //     console.log("Observable Async after 2 sec task done");
  //     observer.next();
  //   }, 2000);
  // });
  // const subscription = observable.subscribe(() =>
  //   console.log("Observable Handler")
  // );
  // subscription.unsubscribe();

  // const promise = new Promise((resolve) => {
  //   console.log("Executing...");
  //   resolve(Math.random());
  // });
  // promise.then((result) => console.log(result));
  // promise.then((result) => console.log(result));

  // const observable = new Observable((observer) => {
  //   console.log("Executing...");
  //   observer.next(Math.random());
  // });
  // observable.subscribe((result) => console.log(result));
  // observable.subscribe((result) => console.log(result));

  //local game category list
  const gameCategoriesList = [
    {
      id: 0,
      name: "animals",
      gameMenuTitle: "Zwierzeta",
      questions: animalList,
      background: { backgroundImage: `url(${AnimalsTile})` },
      gameTile: { AnimalsTile },
      description: "Can you pretend to be a lazy sloth?",
    },
    {
      id: 1,
      name: "films",
      gameMenuTitle: "Filmy",
      questions:
        localStorage.filmList && localStorage.filmList !== ""
          ? localStorage.filmList.split(",")
          : filmList, //checks if there is list of quesitons in local storage
      background: { backgroundImage: `url(${MoviesTile})` },
      gameTile: { MoviesTile },
      description: "Describe your favourite movie!",
    },
    {
      id: 2,
      name: "games",
      gameMenuTitle: "Gry",
      questions:
        localStorage.gamesList && localStorage.gamesList !== ""
          ? localStorage.gamesList.split(",")
          : gamesList, //checks if there is list of quesitons in local storage
      background: { backgroundImage: `url(${GamesTile})` },
      gameTile: { GamesTile },
      description: "Who doesnt love games?",
    },
    {
      id: 3,
      name: "anime",
      gameMenuTitle: "Anime",
      questions:
        localStorage.animeList && localStorage.animeList !== ""
          ? localStorage.animeList.split(",")
          : animeList, //checks if there is list of quesitons in local storage
      background: { backgroundImage: `url(${AnimeTile})` },
      gameTile: { AnimeTile },
      description: "Do you know all the titles and characters?",
    },
    {
      id: 4,
      name: "music",
      gameMenuTitle: "Music",
      questions:
        localStorage.musicList && localStorage.musicList !== ""
          ? localStorage.musicList.split(",")
          : musicList, //checks if there is list of quesitons in local storage
      background: { backgroundImage: `url(${MusicTile})` },
      gameTile: { MusicTile },
      description: "Can you sing them all?",
    },
  ];

  const handleLogin = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/login");
    }, 200);
  };

  const handlePlayersCategories = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/playersCategories");
    }, 200);
  };

  //FETCH MOVIES TITLES FROM ANIME API
  function fetchMyAPIFilms() {
    axiosObservable
      .request({
        url: "https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin",
        method: "GET",
        headers: {
          "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
          "x-rapidapi-key":
            "5bb9e8a323msh942779a3b338994p16b327jsnad6a21812387",
        },
      })
      .subscribe((response) => {
        //console.log(response);
      });

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

  useEffect(() => {
    if (animeFetched && gamesFetched && filmsFetched && musicFetched) {
      setAllFechted(true);
    }
  }, [animeFetched, gamesFetched, filmsFetched, musicFetched]);

  //set local storage if they are not set after all data was fetched
  useEffect(() => {
    if (allFechted) {
      if (localStorage && !localStorage.filmList) {
        localStorage.setItem("filmList", filmList);
      }
      if (localStorage && !localStorage.animeList) {
        localStorage.setItem("animeList", animeList);
      }
      if (localStorage && !localStorage.gamesList) {
        localStorage.setItem("gamesList", gamesList);
      }

      if (localStorage && !localStorage.musicList) {
        localStorage.setItem("musicList", musicList);
      }
    }
  }, [allFechted, filmList, animeList, gamesList, musicList]);

  //fetch data for categories if there is not data in local storage for them
  useEffect(() => {
    if (localStorage.filmList && localStorage.filmList !== "") {
      setFilmsFetched(true);
    } else {
      fetchMyAPIFilms();
    }

    if (localStorage.animeList && localStorage.animeList !== "") {
      setAnimeFetched(true);
    } else {
      fetchMyAPIAnime();
    }

    if (localStorage.gamesList && localStorage.gamesList !== "") {
      setGamesFetched(true);
    } else {
      fetchMyAPIGames();
    }

    if (localStorage.musicList && localStorage.musicList !== "") {
      setMusicFetched(true);
    } else {
      fetchMusicEntries();
      setMusicFetched(true);
    }
  }, []);

  useEffect(() => {
    const page = document.documentElement;

    if (page.requestFullscreen) {
      page.requestFullscreen().catch((err) => {});
    } else if (page.mozRequestFullScreen) {
      page.mozRequestFullScreen().catch((err) => {});
    } else if (page.webkitRequestFullscreen) {
      page.webkitRequestFullscreen().catch((err) => {});
    } else if (page.msRequestFullscreen) {
      page.msRequestFullscreen().catch((err) => {});
    } else {
      document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      window.screen.orientation.lock("portrait");
    }, 1000);
  }, []);

  //checks if the data has been fetched, if not then reload page
  useEffect(() => {
    if (check) {
      if (!allFechted) {
        window.location.reload();
      }
    }
  }, [check, allFechted]);

  const renderLoading = () => {
    //checks if data was fetched in 5 seconds of loading screen
    setTimeout(() => {
      setCheck(true);
    }, 5000);

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
          Loading the game...
        </ParStyle>

        <div
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "5vw",
            color: "#fff",
            position: "absolute",
            textShadow: "3px 3px 0px rgba(0, 0, 0, 0.2)",
          }}
        >
          {!error ? <CircularProgress thickness={5} color="secondary" /> : ""}
        </div>
      </Grid>
    );
  };

  if (allFechted) {
    return (
      <motion.div
        className="app"
        variants={pageVariants}
        transition={pageTransition}
        initial="initial"
        animate="in"
        exit="out"
      >
        <Header />
        <Button
          size="small"
          variant="contained"
          style={buttonStyleMyCat}
          color="primary"
          onClick={handlePlayersCategories}
        >
          PLAYERS CATEGORIES
        </Button>

        <Button
          size="small"
          style={buttonStyleAllCat}
          variant="contained"
          color="secondary"
          onClick={handleLogin}
        >
          Your Categories
        </Button>

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

const mapStateToProps = (state) => {
  return {
    musicList: state.musicEntries,
    alcoholList: state.alcoholEntries,
  };
};

export default connect(mapStateToProps, {
  fetchMusicEntries,
  fetchAlcoholEntries,
})(App);
