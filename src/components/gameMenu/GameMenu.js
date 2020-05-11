import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GameCategoryContext } from "../../contex/GameCategoryContext";
import BackButton from "../BackButton";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

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
  const [currentOrientation, setCurrentOrientation] = useState(false);

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

  const pageVariantsNoSlideAnimation = {
    initial: {
      opacity: 0,
      x: "-100vw",
    },
    in: {
      opacity: 1,
      x: 0,
    },
    out: { opacity: 0 },
  };

  const renderGameMenu = () => {
    return (
      <motion.div
        className="game-menu-container"
        variants={
          currentOrientation === "landscape"
            ? pageVariants
            : pageVariantsNoSlideAnimation
        }
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
  };
  if (gameCategory) {
    return (
      <DeviceOrientation
        lockOrientation={"landscape"}
        onOrientationChange={(orientation) => {
          setCurrentOrientation(orientation);
        }}
      >
        <Orientation orientation="landscape" angle="90" alwaysRender={false}>
          {" "}
          {renderGameMenu()}
        </Orientation>
        <Orientation orientation="portrait" alwaysRender={false}>
          {renderGameMenu()}
        </Orientation>
      </DeviceOrientation>
    );
  } else {
    return <div></div>;
  }
}
