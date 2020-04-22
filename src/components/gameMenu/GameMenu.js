import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { GameCategoryContext } from "../../contex/GameCategoryContext";
import BackButton from "../BackButton";
import buttonClick from "../../sounds/buttonClick.mp3";
import UIfx from "uifx";

import { useHistory } from "react-router-dom";

//import GlowingEffect from "./GlowingEffect";
import GameTitle from "./GameTitle";
import Variants from "./Variants";
import { ParStyle } from "../../styles/Layout";

const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

export default function GameMenu(props) {
  let history = useHistory();

  const { gameCategory } = useContext(GameCategoryContext);

  useEffect(() => {
    const page = document.documentElement;
    if (page.requestFullscreen) {
      page.requestFullscreen();
    } else if (page.mozRequestFullScreen) {
      page.mozRequestFullScreen();
    } else if (page.webkitRequestFullscreen) {
      page.webkitRequestFullscreen();
    } else if (page.msRequestFullscreen) {
      page.msRequestFullscreen();
    }
  }, []);
  useEffect(() => {
    setTimeout(() => {
      window.screen.orientation.lock("portrait");
    }, 200);
  }, []);

  useEffect(() => {
    if (!gameCategory) {
      history.push("/");
    }
  }, [gameCategory, history]);

  const handleGoBack = () => {
    clickSound.play();
    setTimeout(() => {
      history.push("/");
    }, 100);
  };

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
    duration: 2,
  };

  if (gameCategory) {
    return (
      <motion.div
        className="game-menu-container"
        variants={pageVariants}
        transition={pageTransition}
        initial="initial"
        animate="in"
        exit="out"
      >
        <div className="game-menu-container-game-tile-description">
          <BackButton handleGoBack={handleGoBack} />
          {/* <GlowingEffect></GlowingEffect> */}
          <GameTitle gameCategoryImage={gameCategory.background} />
          <ParStyle style={{ marginTop: "45px" }}>
            {gameCategory.description}
          </ParStyle>
        </div>

        <Variants />
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}
