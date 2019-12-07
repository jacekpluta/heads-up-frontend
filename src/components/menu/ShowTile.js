import React from "react";
import { motion } from "framer-motion";
import ShowPic from "../pic/showPic.jpg";

const showTileStyle = { backgroundImage: `url(${ShowPic})` };

export default function ShowTile(props) {
  return (
    <motion.div
      className="TileStyle"
      style={showTileStyle}
      onClick={props.handleGameVariantShow}
    ></motion.div>
  );
}
