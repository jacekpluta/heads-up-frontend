import React from "react";
import "./styles.css";

import Header from "./components/Header";
import Main from "./components/Main";

import AnimalsTile from "./components/pic/animalsTile.jpg";
import MoviesTile from "./components/pic/moviesTile.jpg";
import GamesTile from "./components/pic/gamesTile.jpg";
import CarsTile from "./components/pic/carsTile.jpg";

//styled components (styles.css)
// fix refresh button
//zmiana kolerow przy wyborze, ladne przejscie
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
    questions: ["Kot", "Pies", "Mysz", "Kon", "Buldog"],
    background: { backgroundImage: `url(${AnimalsTile})` },
    gameTile: AnimalsTile
  },
  2: {
    id: 2,
    name: "films",
    gameMenuTitle: "Filmy",
    questions: ["Marvel", "Joker", "Netflix", "Star Wars", "Romantic"],
    background: { backgroundImage: `url(${MoviesTile})` },
    gameTile: MoviesTile
  },
  3: {
    id: 3,
    name: "games",
    gameMenuTitle: "Gry",
    questions: ["CS", "FPS", "RPG", "Tibia", "Dark Souls"],
    background: { backgroundImage: `url(${GamesTile})` },
    gameTile: GamesTile
  }
};

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Main gameVariantsList={gameVariantsList}></Main>
    </div>
  );
}

export default App;
