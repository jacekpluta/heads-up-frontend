import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import GameTitle from "./GameTitle";
import Variants from "./Variants";

const pStyle = {
  textAlign: "center",
  width: "100%",
  marginTop: "0%",
  marginBottom: "3%",
  fontSize: "120px",
  color: "#fff",
  textShadow:
    "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff, 0 0 40px #00DEFF, 0 0 70px #00DEFF, 0 0 80px #00DEFF, 0 0 100px #00DEFF, 0 0 150px #00DEFF"
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

          <p style={pStyle}>{props.gameVariant.gameMenuTitle}</p>
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
