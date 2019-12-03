import React from "react";
import { motion } from "framer-motion";
import ShowPic from "../pic/showPic.jpg";

const showTileStyle = { backgroundImage: `url(${ShowPic})` };

export default function ShowTile() {
  return <motion.div className="TileStyle" style={showTileStyle}></motion.div>;
}
