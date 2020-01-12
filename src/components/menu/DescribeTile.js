import React from "react";
import { motion } from "framer-motion";
import DescribePic from "../../pic/describePic.jpg";

const describleTileStyle = {
  backgroundImage: `url(${DescribePic})`,
  cursor: `pointer`,
  borderColor: "#09f"
};

function DescribeTile(props) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      className="TileStyle"
      style={describleTileStyle}
      onClick={props.handleGameVariantDescribe}
    ></motion.div>
  );
}

export default DescribeTile;
