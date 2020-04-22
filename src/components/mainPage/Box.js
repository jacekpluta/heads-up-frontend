import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import UIfx from "uifx";
import buttonClick from "../../sounds/buttonClick.mp3";
import { DivLink } from "../../styles/Layout";
import { GameCategoryContext } from "../../contex/GameCategoryContext";
import { MuteSoundContext } from "../../contex/MuteSoundContext";

import { useHistory } from "react-router-dom";

function Box(props) {
  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);

  const { setGameCategory } = useContext(GameCategoryContext);

  const { backgroundImage, gameCategory } = props;

  const { muteSound } = useContext(MuteSoundContext);

  let history = useHistory();

  //SOUDS
  const clickSound = new UIfx(buttonClick, {
    volume: 1,
    throttleMs: 100,
  });

  //plays click on box click
  const boxClicked = () => {
    if (gameCategory) {
      clickSound.play();
    }
  };

  //mutes click sound
  useEffect(() => {
    if (muteSound) {
      clickSound.setVolume(0);
    } else {
      clickSound.setVolume(1);
    }
  }, [muteSound, clickSound]);

  //OPEN GAME MENU AFTER PICKING GAME CATEGORY
  const handleGameCategoryPicked = () => {
    setGameCategoryPicked(!gameCategoryPicked);
    setGameCategory(gameCategory);
  };

  useEffect(() => {
    if (gameCategoryPicked) {
      history.push("/gamemenu");
    }
  }, [gameCategoryPicked, history]);

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
