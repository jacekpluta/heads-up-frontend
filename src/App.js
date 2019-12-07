import React from "react";
import "./styles.css";

import Header from "./components/Header";
import Main from "./components/Main";

import AnimalsTile from "./components/pic/animalsTile.jpg";
import MoviesTile from "./components/pic/moviesTile.jpg";
import GamesTile from "./components/pic/gamesTile.jpg";
import CarsTile from "./components/pic/carsTile.jpg";

const gameVariantsList = {
  0: {
    id: 1,
    name: "cars",
    questions: ["Mercedes", "BMW", "Ford", "Fiat", "Audi"],
    background: { backgroundImage: `url(${CarsTile})` },
    gameTile: CarsTile,
    title: "Kategoria auta"
  },
  1: {
    id: 1,
    name: "animals",
    questions: ["Kot", "Pies", "Mysz", "Kon", "Buldog"],
    background: { backgroundImage: `url(${AnimalsTile})` },
    gameTile: AnimalsTile,
    title: "Kategoria zwierzęta"
  },
  2: {
    id: 2,
    name: "films",
    questions: ["Marvel", "Joker", "Netflix", "Star Wars", "Romantic"],
    background: { backgroundImage: `url(${MoviesTile})` },
    gameTile: MoviesTile,
    title: "Kategoria filmy"
  },
  3: {
    id: 3,
    name: "games",
    questions: ["CS", "FPS", "RPG", "Tibia", "Dark Souls"],
    background: { backgroundImage: `url(${GamesTile})` },
    gameTile: GamesTile,
    title: "Kategoria gry"
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
