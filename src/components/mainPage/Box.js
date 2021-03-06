import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";

import { DivLink } from "../../styles/Layout";
import { GameCategoryContext } from "../../contex/GameCategoryContext";
import { clickSound } from "../Sounds";
import { useHistory } from "react-router-dom";

function Box(props) {
  const [gameCategoryPicked, setGameCategoryPicked] = useState(false);

  const { setGameCategory } = useContext(GameCategoryContext);

  const { backgroundImage, gameCategory } = props;

  let history = useHistory();

  //plays click on box click
  const boxClicked = () => {
    if (gameCategory) {
      clickSound.play();
    }
  };

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
      className="box"
      whileHover={{ scale: 1.05 }}
      onClick={() => boxClicked()}
    >
      <DivLink onClick={handleGameCategoryPicked}> </DivLink>
    </motion.div>
  );
}

//{this.state.showComponent ? <GameModule /> : null}
export default Box;
