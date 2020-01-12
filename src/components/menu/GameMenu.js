import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import GameTitle from "./GameTitle";
import Variants from "./Variants";
import { ParStyle } from "../../styles/Layout";

export default function GameMenu(props) {
  const pageTransition = {
    inBox: {
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 1
      },
      x: 0
    },
    outBox: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 1
      },
      x: 300
    }
  };
  return (
    <AnimatePresence>
      {props.showgameMenu && (
        <motion.div
          className="GameMenu"
          variants={pageTransition}
          initial={props.activeGameMenu ? "outBox" : "inBox"}
          animate={props.activeGameMenu ? "inBox" : "outBox"}
          exit={props.activeGameMenu ? "outBox" : "inBox"}
        >
          <GameTitle gameVariant={props.gameVariant} />

          <ParStyle>{props.gameVariant.gameMenuTitle}</ParStyle>
          <Variants
            handleGameVariantDescribe={props.handleGameVariantDescribe}
            handleGameVariantShow={props.handleGameVariantShow}
            handleGameChallange={props.handleGameChallange}
            handleGameDraw={props.handleGameDraw}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
