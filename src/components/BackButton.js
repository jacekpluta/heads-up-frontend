import React from "react";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";

import UIfx from "uifx";
import buttonClick from "../sounds/buttonClick.mp3";

const clickSound = new UIfx(buttonClick, {
  volume: 1,
  throttleMs: 100,
});

const BackButton = (props) => {
  const {
    turnOffClickOnSkip,
    turnOnClickOnSkip,
    showCounterTimer,
    handleGoBack,
  } = props;

  return (
    <motion.div
      onHoverStart={showCounterTimer ? () => turnOffClickOnSkip() : ""}
      onHoverEnd={showCounterTimer ? () => turnOnClickOnSkip() : ""}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8 }}
      onClick={() => {
        handleGoBack();
        clickSound.play();
      }}
      className="backbutton"
    >
      <Icon color="white" path={mdiArrowLeftCircle} />
    </motion.div>
  );
};
export default BackButton;
