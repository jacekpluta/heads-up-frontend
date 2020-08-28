import React, { useContext } from "react";
import { motion } from "framer-motion";
import ChallangePic from "../../../pic/challangePic.jpg";
import { GameVariantContext } from "../../../contex/GameVariantContext";

const challangeTileStyle = {
  backgroundImage: `url(${ChallangePic})`,
  cursor: `pointer`,
  borderColor: "rgb(66, 228, 66)",
};

export default function ChallangeTile(props) {
  const { setGameVariant } = useContext(GameVariantContext);

  const { handleStartGame } = props;

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95, transition: { duration: 1 } }}
      className="tile"
      style={challangeTileStyle}
      onClick={() => {
        handleStartGame();
        setGameVariant("challange");
      }}
    ></motion.div>
  );
}
