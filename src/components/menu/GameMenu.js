import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import GameTitle from "./GameTitle";
import Variants from "./Variants";

const pStyle = {
  fontSize: "36px",
  textAlign: "center",
  color: "black",
  width: "100%",
  height: "10vh"
};

export default function GameMenu(props) {
  return (
    <AnimatePresence>
      {props.showgameMenu && (
        <motion.div
          className="GameMenu"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 100 }}
          transition={{ delay: 0.05 }}
          exit={{ opacity: 0 }}
        >
          <GameTitle gameVariant={props.gameVariant} />

          <p style={pStyle}>{props.gameVariant.title}</p>
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
