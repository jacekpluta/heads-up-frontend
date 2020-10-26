import React from "react";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";

import { clickSound } from "./Sounds";

const BackButton = (props) => {
  const {
    turnOffClickOnSkip,
    turnOnClickOnSkip,
    showCounterTimer,
    handleGoBack,
    blackColor,
    entriesList
  } = props;

  return (
    <motion.div
      onHoverStart={showCounterTimer ? () => turnOffClickOnSkip() : ""}
      onHoverEnd={showCounterTimer ? () => turnOnClickOnSkip() : ""}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        handleGoBack();
        clickSound.play();
      }}
      className={entriesList ? "backbuttonEntriesList" : "backbutton"}
    >
      <Icon
        color={blackColor ? "white" : "white"}
        style={
          blackColor
            ? { width: 50 + "px", height: 50 + "px" }
            : { width: 50 + "px", height: 50 + "px" }
        }
        path={mdiArrowLeftCircle}
      />
    </motion.div>
  );
};
export default BackButton;
