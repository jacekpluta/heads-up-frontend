import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import UIfx from "uifx";
import buttonClick from "../sounds/buttonClick.mp3";
import { DivLink } from "../styles/Layout";
import { GameCategoryContext } from "./contex/GameCategoryContext";

import { useHistory } from "react-router-dom";

function Box(props) {
  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);

  const { setGameCategory } = useContext(GameCategoryContext);

  const { backgroundImage, gameVariant, muteSounds } = props;

  let history = useHistory();

  //SOUDS
  const clickSound = new UIfx(buttonClick, {
    volume: 1,
    throttleMs: 100,
  });

  const boxClicked = () => {
    if (gameVariant) {
      clickSound.play();
    }
  };

  useEffect(() => {
    if (muteSounds) {
      clickSound.setVolume(0);
    } else {
      clickSound.setVolume(1);
    }
  }, [muteSounds]);

  //OPEN GAME MENU AFTER PICKING GAME CATEGORY
  const handleGameCategoryPicked = () => {
    setGameCategoryPicked(!gameCategoryPicked);
    setGameCategory(gameVariant);
  };

  useEffect(() => {
    if (gameCategoryPicked) {
      history.push("/gamemenu");
    }
  }, [gameCategoryPicked]);

  return (
    <motion.div
      style={backgroundImage}
      className="Box"
      whileHover={{ scale: 1.05 }}
      onClick={() => boxClicked()}
    >
      <DivLink onClick={handleGameCategoryPicked}> </DivLink>
    </motion.div>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
