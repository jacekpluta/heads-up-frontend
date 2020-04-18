import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Icon from "@mdi/react";
import { mdiArrowLeftCircle } from "@mdi/js";

function BackButton(props) {
  const {
    turnOffClickOnSkip,
    turnOnClickOnSkip,
    handleGoBack,
    showCounterTimer,
  } = props;

  return (
    <motion.div
      onHoverStart={showCounterTimer ? () => turnOffClickOnSkip() : ""}
      onHoverEnd={showCounterTimer ? () => turnOnClickOnSkip() : ""}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.8, transition: { duration: 1 } }}
      onClick={() => handleGoBack()}
      className="BackButtonContainer"
    >
      <Icon color="white" path={mdiArrowLeftCircle} />
    </motion.div>
  );
}
export default BackButton;
