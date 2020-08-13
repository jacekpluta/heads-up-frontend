import React from "react";

import { motion } from "framer-motion";
import { pageVariants } from "../PageVariants";
import { pageTransition } from "../PageTransition";

import BackButton from "../BackButton";

function HowToPlay(props) {
  const { handleGoBack, showHowToPlay } = props;

  return (
    <motion.div
      className="howtoplay"
      variants={pageVariants}
      transition={pageTransition}
      initial="initial"
      animate="in"
      exit="out"
      style={
        showHowToPlay ? { visibility: "visible" } : { visibility: "hidden" }
      }
    >
      <BackButton handleGoBack={handleGoBack}></BackButton>
    </motion.div>
  );
}

export default HowToPlay;
