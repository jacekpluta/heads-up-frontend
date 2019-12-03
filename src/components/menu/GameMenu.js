import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import GameTitle from "./GameTitle";
import Variants from "../Variants";

const pStyle = {
  fontSize: "36px",
  textAlign: "center",
  color: "black",
  width: "100%",
  height: "5vh"
};

export default function GameMenu(props) {
  return (
    <AnimatePresence>
      {props.showgameMenu && (
        <motion.div
          className="GameMenu"
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 100 }}
          transition={{ delay: 0.4 }}
          exit={{ opacity: 0 }}
        >
          <GameTitle />

          <p style={pStyle}>Zgaduj zwierze</p>
          <Variants />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
