import React, { useState } from "react";
import { motion } from "framer-motion";
import medalBronze from "../pic/medalBronze.png";
import medalSilver from "../pic/medalSilver.png";
import medalGold from "../pic/medalGold.png";

const medalBronzeStyle = {
  backgroundImage: `url(${medalBronze})`,
};
const medalSilverStyle = {
  backgroundImage: `url(${medalSilver})`,
};
const medalGoldStyle = {
  backgroundImage: `url(${medalGold})`,
};
export default function Medal(props) {
  const { countPoints } = props;

  const [allPoints] = useState(countPoints());

  const medalStyle = () => {
    if (allPoints < 4) {
      return medalBronzeStyle;
    } else if (allPoints < 7) {
      return medalSilverStyle;
    } else {
      return medalGoldStyle;
    }
  };

  return (
    <motion.div
      style={medalStyle()}
      className="medal"
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        duration: 2,
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 2,
      }}
    >
      {" "}
      {<p className="points"> {allPoints}</p>}
    </motion.div>
  );
}
