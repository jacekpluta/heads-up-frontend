import React from "react";
import { motion } from "framer-motion";
import DrawPic from "../pic/drawPic.jpg";

const drawTileStyle = { backgroundImage: `url(${DrawPic})` };

export default function DrawTile() {
  return <motion.div className="TileStyle" style={drawTileStyle}></motion.div>;
}
