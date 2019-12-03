import React, { useState } from "react";
import { motion } from "framer-motion";
import DescribePic from "../pic/describePic.jpg";

const describleTileStyle = {
  backgroundImage: `url(${DescribePic})`,
  cursor: `pointer`
};

function DescribeTile(props) {
  return (
    <motion.div
      className="TileStyle"
      style={describleTileStyle}
      onClick={props.onClick}
    ></motion.div>
  );
}

export default DescribeTile;
