import React, { Component, useState, useEffect } from "react";
import Box from "./Box";
import AnimalsTile from "../components/pic/animalsTile.jpg";
import MoviesTile from "../components/pic/moviesTile.jpg";
import GamesTile from "../components/pic/gamesTile.jpg";

const Main = () => {
  const numbers = [1, 2, 3];
  const [boxId, setboxId] = useState(0);

  const handleBoxId = boxIdProps => {
    setboxId(boxIdProps);
  };

  const addGameVariant = variant => {
    setGameVariantsList([...gameVariant, variant]);
  };

  const [gameVariantsList, setGameVariantsList] = useState({
    1: {
      id: 1,
      name: "animals",
      questions: ["Kot", "Pies", "Mysz", "Kon", "Buldog"],
      background: { backgroundImage: `url(${AnimalsTile})` },
      gameTile: AnimalsTile
    },
    2: {
      id: 2,
      name: "films",
      questions: ["Marvel", "Joker", "Netflix", "Star Wars", "Romantic"],
      background: { backgroundImage: `url(${MoviesTile})` },
      gameTile: MoviesTile
    },
    3: {
      id: 2,
      name: "games",
      questions: ["CS", "FPS", "RPG", "Tibia", "Dark Souls"],
      background: { backgroundImage: `url(${GamesTile})` },
      gameTile: GamesTile
    }
  });

  const [gameVariant, setCurrentGameVariant] = useState({
    id: 1,
    name: "animals",
    questions: ["Kot", "Pies", "Mysz", "Kon", "Buldog"],
    background: { backgroundImage: `url(${AnimalsTile})` },
    gameTile: AnimalsTile
  });

  const handleCurrentGameVariant = key => {
    if (gameVariant.id === boxId) {
      setCurrentGameVariant({
        name: gameVariantsList[2].name,
        questions: gameVariantsList[2].questions,
        background: gameVariantsList[2].background,
        gameTile: gameVariantsList[2].gameTile
      });
    }
  };

  return (
    <div className="Main">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="18"
        height="18"
        viewBox="0 0 172 172"
        style={{ fill: "#000000" }}
      >
        <g
          strokeWidth="1"
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit="10"
          strokeDasharray=""
          strokeDashoffset="0"
          style={{ mixblendmode: "normal" }}
        >
          <path d="M0,172v-172h172v172z" fill="none"></path>
          <g fill="#eeeeee">
            <path d="M143.19336,21.43001c-0.26705,0.00844 -0.53341,0.03181 -0.79785,0.06999h-34.89551c-2.58456,-0.03655 -4.98858,1.32136 -6.29153,3.55376c-1.30295,2.2324 -1.30295,4.99342 0,7.22582c1.30295,2.2324 3.70697,3.59031 6.29153,3.55376h18.53256l-66.59961,66.59961c-1.8722,1.79752 -2.62637,4.46674 -1.97164,6.97823c0.65473,2.51149 2.61604,4.4728 5.12753,5.12753c2.51149,0.65473 5.18071,-0.09944 6.97823,-1.97165l66.59961,-66.59961v18.53255c-0.03655,2.58456 1.32136,4.98858 3.55376,6.29153c2.2324,1.30295 4.99342,1.30295 7.22582,0c2.2324,-1.30295 3.59031,-3.70697 3.55376,-6.29153v-34.9235c0.28889,-2.08845 -0.35639,-4.19816 -1.76411,-5.76769c-1.40772,-1.56953 -3.43507,-2.43964 -5.54253,-2.3788zM35.83333,21.5c-7.83362,0 -14.33333,6.49972 -14.33333,14.33333v100.33333c0,7.83362 6.49972,14.33333 14.33333,14.33333h100.33333c7.83362,0 14.33333,-6.49972 14.33333,-14.33333v-43c0.03655,-2.58456 -1.32136,-4.98858 -3.55376,-6.29153c-2.2324,-1.30295 -4.99342,-1.30295 -7.22582,0c-2.2324,1.30295 -3.59031,3.70697 -3.55376,6.29153v43h-100.33333v-100.33333h43c2.58456,0.03655 4.98858,-1.32136 6.29153,-3.55376c1.30295,-2.2324 1.30295,-4.99342 0,-7.22582c-1.30295,-2.2324 -3.70697,-3.59031 -6.29153,-3.55376z"></path>
          </g>
        </g>
      </svg>

      {numbers.map((key, id) => {
        return (
          <Box
            gameVariant={gameVariant}
            handleCurrentGameVariant={handleCurrentGameVariant}
            key={key}
            id={id}
            backgroundBox={gameVariantsList[key].background}
            handleBoxId={handleBoxId}
          ></Box>
        );
      })}
    </div>
  );
};

export default Main;
