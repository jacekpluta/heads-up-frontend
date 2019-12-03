import React from "react";
import { motion } from "framer-motion";
import ChallangePic from "../pic/challangePic.jpg";

const challangeTileStyle = { backgroundImage: `url(${ChallangePic})` };

export default function ChallangeTile() {
  return (
    <motion.div className="TileStyle" style={challangeTileStyle}></motion.div>
  );
}
