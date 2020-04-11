import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameCategoryContext } from "../contex/GameCategoryContext";
import BackButton from "../BackButton";
import buttonClick from "../../sounds/buttonClick.mp3";
import UIfx from "uifx";

import { useHistory } from "react-router-dom";

import GlowingEffect from "./GlowingEffect";
import GameTitle from "./GameTitle";
import Variants from "./tiles/Variants";
import { ParStyle } from "../../styles/Layout";

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

const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

export default function GameMenu(props) {
  let history = useHistory();

  const { gameCategory } = useContext(GameCategoryContext);
  const [transitionOff, setTransitionOff] = useState(false);

  useEffect(() => {
    window.screen.orientation.lock("landscape");
  }, []);

  useEffect(() => {
    if (!gameCategory) {
      history.push("/");
    }
  }, [gameCategory]);

  const handleGoBack = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/");
    }, 100);
    setTransitionOff(true);
  };

  const gameTitleStyle = {
    borderBottomStyle: "solid",
    background: "#023875",
    borderWidth: "0px",
    borderBottomLeftRadius: "30px",
    borderBottomRightRadius: "30px",
    paddingBottom: "10px",
  };

  if (gameCategory) {
    return (
      <motion.div
        variants={pageTransition}
        initial={transitionOff ? "inModule" : "outModule"}
        animate={transitionOff ? "outModule" : "inModule"}
        exit={transitionOff ? "inModule" : "outModule"}
        className="gameMenu"
      >
        <div style={gameTitleStyle}>
          <BackButton handleGoBack={handleGoBack} />
          <GlowingEffect></GlowingEffect>
          <GameTitle gameCategoryImage={gameCategory.background} />
          <ParStyle>{gameCategory.description}</ParStyle>
        </div>

        <Variants />
      </motion.div>
    );
  } else {
    return <React.Fragment></React.Fragment>;
  }
}
