import React, { useState } from "react";
import { motion } from "framer-motion";
import DescribePic from "../pic/describePic.jpg";

const describleTileStyle = {
  backgroundImage: `url(${DescribePic})`,
  cursor: `pointer`
};

function DescribeTile(props) {
  const [gameVariantChosen, setGameVariantChosen] = useState(false);

  const handleGameVariantChosen = setGameVariantChosen => {
    setGameVariantChosen(true);
  };

  return (
    <motion.div
      className="TileStyle"
      style={describleTileStyle}
      onClick={handleGameVariantChosen}
      gameVariantChosen={gameVariantChosen}
    ></motion.div>
  );
}

export default DescribeTile;
