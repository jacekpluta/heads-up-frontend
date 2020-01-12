import React, { useEffect, useState } from "react";
import "../styles/styles.css";

import Header from "./Header";
import Main from "./Main";

import AnimalsTile from "../pic/animalsTile.jpg";
import MoviesTile from "../pic/moviesTile.jpg";
import GamesTile from "../pic/gamesTile.jpg";
import CarsTile from "../pic/carsTile.jpg";
import AnimeTile from "../pic/animeTile.jpg";

import { ParStyle, BlueBackgroundStyle } from "../styles/Layout";
import { isBrowser } from "react-device-detect";
import animalList from "./lists/AnimalsList";
import axios from "axios";

// fix refresh button
//zmiana kolerow przy wyborze, ladne przejscie

function App() {
  const [filmList, setFilmList] = useState("");
  const [gameList, setGameList] = useState("");
  const [animeList, setAnimeList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=01e57b363d38e654e9afbd273dce30c3&language=en-US&page=1"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        Object.entries(data.results).map(([key, value]) =>
          setFilmList(filmList => [...filmList, data.results[key].title])
        );
      })
      .then(setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });

    axios({
      method: "GET",
      url: "https://rawg-video-games-database.p.rapidapi.com/games",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
        "x-rapidapi-key": "e7ded30215msh9c35219cd4db934p1c9604jsn6de6432b8ee4"
      }
    })
      .then(response => {
        Object.entries(response.data.results).map(([key, value]) =>
          setGameList(gameList => [
            ...gameList,
            response.data.results[key].name
          ])
        );
      })
      .then(setIsLoading(false))
      .catch(error => {
        setIsLoading(false);
        console.log(error);
      });

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
            next:
              "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=2",
            last:
              "https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=3"
          }
        }
      })
        .then(response => {
          Object.entries(response.data.data).map(([key, value]) =>
            setAnimeList(animeList => [
              ...animeList,
              response.data.data[key].attributes.titles.en_jp
            ])
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
    fetchMyAPIAnime();
  }, []);

  const gameVariantsList = {
    0: {
      id: 1,
      name: "cars",
      gameMenuTitle: "Auta",
      questions: ["Mercedes", "BMW", "Ford", "Fiat", "Audi"],
      background: { backgroundImage: `url(${CarsTile})` },
      gameTile: CarsTile
    },
    1: {
      id: 1,
      name: "animals",
      gameMenuTitle: "Zwierzeta",
      questions: animalList,
      background: { backgroundImage: `url(${AnimalsTile})` },
      gameTile: AnimalsTile
    },
    2: {
      id: 2,
      name: "films",
      gameMenuTitle: "Filmy",
      questions: filmList,
      background: { backgroundImage: `url(${MoviesTile})` },
      gameTile: MoviesTile
    },
    3: {
      id: 3,
      name: "games",
      gameMenuTitle: "Gry",
      questions: gameList,
      background: { backgroundImage: `url(${GamesTile})` },
      gameTile: GamesTile
    },
    4: {
      id: 4,
      name: "anime",
      gameMenuTitle: "Anime",
      questions: animeList,
      background: { backgroundImage: `url(${AnimeTile})` },
      gameTile: AnimeTile
    }
  };

  useEffect(() => {
    window.onscroll = function() {
      if (window.pageYOffset === 0) {
        console.log("I AM AT THE TOP");
      } else {
      }
    };
  }, []);

  if (isLoading || isLoading) {
    return <p>Loading ...</p>;
  }

  if (isBrowser) {
    return (
      <div>
        {" "}
        <BlueBackgroundStyle>
          <ParStyle style={{ marginTop: "25%", fontSize: "5vw" }}>
            This content is only aviable on phone or tablet devices
          </ParStyle>
        </BlueBackgroundStyle>
      </div>
    );
  }
  return (
    <div className="App">
      <Header></Header>
      <Main gameVariantsList={gameVariantsList}></Main>
    </div>
  );
}

export default App;
