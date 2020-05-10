import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { GameCategoryContext } from "../../contex/GameCategoryContext";
import BackButton from "../BackButton";

import { useHistory } from "react-router-dom";

//import GlowingEffect from "./GlowingEffect";
import GameTitle from "./GameTitle";
import Variants from "./Variants";
import { PStyle } from "../../styles/Layout";

import { pageVariants } from "../PageVariants";
import { pageTransition } from "../PageTransition";

export default function GameMenu(props) {
  let history = useHistory();

  const handleGoBack = () => {
    setTimeout(() => {
      history.push("/");
    }, 200);
  };

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
    }, 1000);
  }, []);

  useEffect(() => {
    if (!gameCategory) {
      history.push("/");
    }
  }, [gameCategory, history]);

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
          <PStyle style={{ marginTop: "15px" }}>
            {gameCategory.description}
          </PStyle>
        </div>

        <Variants />
      </motion.div>
    );
  } else {
    return <div></div>;
  }
}
