import React from "react";
import { motion } from "framer-motion";
import DrawPic from "../pic/drawPic.jpg";

const drawTileStyle = { backgroundImage: `url(${DrawPic})` };

export default function DrawTile(props) {
  return (
    <motion.div
      className="TileStyle"
      style={drawTileStyle}
      onClick={props.onClick}
    ></motion.div>
  );
}
