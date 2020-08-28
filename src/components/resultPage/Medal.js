import React, { useState } from "react";
import { motion } from "framer-motion";
import medalBronze from "../../pic/medalBronze.png";
import medalSilver from "../../pic/medalSilver.png";
import medalGold from "../../pic/medalGold.png";

const medalBronzeStyle = {
  backgroundImage: `url(${medalBronze})`,
};
const medalSilverStyle = {
  backgroundImage: `url(${medalSilver})`,
};
const medalGoldStyle = {
  backgroundImage: `url(${medalGold})`,
};

const pointsBronzeStyle = {
  background: "linear-gradient(#d2761e, #b98c4e )",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const pointsSilverStyle = {
  background: "linear-gradient(#eee, #333)",
  webkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const pointsGoldStyle = {
  background: "linear-gradient(#FCF6BA, #BF953F)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

export default function Medal(props) {
  const { countPoints } = props;

  const [allPoints] = useState(countPoints());

  const medalStyle = () => {
    if (allPoints < 3) {
      return medalBronzeStyle;
    } else if (allPoints < 6) {
      return medalSilverStyle;
    } else {
      return medalGoldStyle;
    }
  };

  const pointsStyle = () => {
    if (allPoints < 3) {
      return pointsBronzeStyle;
    } else if (allPoints < 6) {
      return pointsSilverStyle;
    } else {
      return pointsGoldStyle;
    }
  };

  return (
    <motion.div
      style={medalStyle()}
      className="medal"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        duration: 3,
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 2,
      }}
    >
      {
        <p className="medal__points" style={pointsStyle()}>
          {allPoints}
        </p>
      }
    </motion.div>
  );
}
