import React from "react";
import { motion } from "framer-motion";
import ChallangePic from "../../pic/challangePic.jpg";

const challangeTileStyle = {
  backgroundImage: `url(${ChallangePic})`,
  cursor: `pointer`,
  borderColor: "rgb(66, 228, 66)"
};

export default function ChallangeTile(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      className="TileStyle"
      style={challangeTileStyle}
      onClick={props.handleGameChallange}
    ></motion.div>
  );
}
