import React from "react";
import { motion } from "framer-motion";
import DrawPic from "../../pic/drawPic.jpg";

const drawTileStyle = {
  backgroundImage: `url(${DrawPic})`,
  cursor: `pointer`,
  borderColor: "rgb(111, 0, 255)"
};

export default function DrawTile(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      className="TileStyle"
      style={drawTileStyle}
      onClick={props.handleGameDraw}
    ></motion.div>
  );
}
