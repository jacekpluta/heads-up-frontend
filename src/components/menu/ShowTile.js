import React from "react";
import { motion } from "framer-motion";
import ShowPic from "../../pic/showPic.jpg";

const showTileStyle = {
  backgroundImage: `url(${ShowPic})`,
  cursor: `pointer`,
  borderColor: "rgb(255, 168, 6)"
};

export default function ShowTile(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      className="TileStyle"
      style={showTileStyle}
      onClick={props.handleGameVariantShow}
    ></motion.div>
  );
}
