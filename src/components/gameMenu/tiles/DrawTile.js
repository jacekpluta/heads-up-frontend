import React, { useContext } from "react";
import { motion } from "framer-motion";
import DrawPic from "../../../pic/drawPic.jpg";
import { GameVariantContext } from "../../../contex/GameVariantContext";

const drawTileStyle = {
  backgroundImage: `url(${DrawPic})`,
  cursor: `pointer`,
  borderColor: "rgb(111, 0, 255)",
};

export default function DrawTile(props) {
  const { setGameVariant } = useContext(GameVariantContext);
  const { handleStartGame } = props;
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      className="tile"
      style={drawTileStyle}
      onClick={() => {
        handleStartGame();
        setGameVariant("draw");
      }}
    ></motion.div>
  );
}
