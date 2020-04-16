import React, { useContext } from "react";
import { motion } from "framer-motion";
import DescribePic from "../../../pic/describePic.jpg";
import { GameVariantContext } from "../../../contex/GameVariantContext";

const describleTileStyle = {
  backgroundImage: `url(${DescribePic})`,
  cursor: `pointer`,
  borderColor: "#09f",
};

function DescribeTile(props) {
  const { setGameVariant } = useContext(GameVariantContext);
  const { handleStartGame } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      className="TileStyle"
      style={describleTileStyle}
      onClick={() => {
        handleStartGame();
        setGameVariant("opowiadaj");
      }}
    ></motion.div>
  );
}

export default DescribeTile;
